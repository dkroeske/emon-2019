import {AfterViewInit, Component, ElementRef, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})

export class GaugeComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('canvas') canvasRef: ElementRef;
  @Input() width;
  @Input() height;
  ctx: CanvasRenderingContext2D;

  @Input() value: number = 0;
  @Input() maxValue: number = 4000;
  @Input() minValue: number = 0;
  @Input() infoLabel: string = '--';
  @Input() unitLabel: string = '--';
  @Input() valueLabel = 'value';

  private degrees: number = 0;
  private degreesDelta: number = 0;
  private degreesEnd: number = 0;
  private degreesCnt: number = 0;
  private animation: boolean = false;
  private running: boolean = false;

  constructor(private ngZone: NgZone) { }

  ngOnChanges(changes: SimpleChanges) {
    if ( !this.animation ) {
      if ( this.value >= this.maxValue ) {
        this.maxValue = this.value * 1.2;
      }
      this.degreesEnd = 240.0 * this.value / this.maxValue;
      this.degreesDelta = this.degreesEnd - this.degrees;
      this.degreesCnt = 0;
      this.animation = true;
   }
  }

  ngOnInit() {
    this.running = true;
    this.ngZone.runOutsideAngular( () => this.paint() );
  }

  ngOnDestroy() {
    this.running = false;
  }

  private paint() {
    if (!this.running) { return; }

    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    const width = this.ctx.canvas.width;
    const height = this.ctx.canvas.height;
    const midWidth = width / 2.0;
    const midHeigth = height / 2.0;


    //console.log(width + ' ' + height);

    this.ctx.clearRect(0.0, 0.0, width, height);

    // Background Arc
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'rgba(69,136,193,1.0)';
    this.ctx.lineWidth = 10;
    this.ctx.arc(midWidth, midHeigth, midHeigth - 15, this.toRadians(150), this.toRadians(30), false);
    this.ctx.lineCap = 'butt';
    this.ctx.stroke();

    // Draw Arc
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'rgba(157,215,242,1.0)';
    this.ctx.lineWidth = 15;
    this.ctx.arc(midWidth, midHeigth, midHeigth - 15, this.toRadians(150), this.toRadians(150 + this.degrees), false);
    this.ctx.lineCap = 'butt';
    this.ctx.stroke();

    //
    this.ctx.fillStyle = 'rgba(28,167,79,1.0)';

    this.ctx.font = 'normal 24px Arial';
    this.ctx.fillText(this.valueLabel, midWidth - this.ctx.measureText(this.valueLabel).width / 2.0 - 10, midHeigth + 0);

    this.ctx.font = 'normal 14px Arial';
    this.ctx.fillText(this.unitLabel, midWidth + this.ctx.measureText(this.valueLabel).width - 10, midHeigth - 6);

    this.ctx.font = 'lighter small-caps 14px Arial';
    this.ctx.fillText(this.infoLabel, midWidth - this.ctx.measureText(this.infoLabel).width / 2.0, midHeigth + 20 );

    // Assume fps approx. 60 fps
    if (this.animation === true) {
      this.degrees += (this.degreesDelta / 60.0);
      if (this.degreesCnt < 60.0 ) {
        this.degreesCnt ++;
      } else {
        this.animation = false;
      }
    }

    requestAnimationFrame( () => this.paint() );
  }


  // Omrekenen graden naar radialen
  private toRadians(degrees: number): number {
    return degrees * Math.PI / 180;
  }


}
