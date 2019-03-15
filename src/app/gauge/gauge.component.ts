import { Component, ElementRef, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})

export class GaugeComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('canvas') canvasRef: ElementRef;
  @Input() value: number = 0;
  @Input() maxValue: number = 4000;
  @Input() unitText: string = '--';

  private degrees: number = 0;
  private degreesDelta: number = 0;
  private degreesEnd: number = 0;
  private degreesCnt: number = 0;
  private animation: boolean = false;
  private running: boolean = false;

  constructor(private ngZone: NgZone) { }

  ngOnChanges(changes: SimpleChanges) {
    if ( !this.animation ) {
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

    const ctx = this.canvasRef.nativeElement.getContext('2d');
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const midWidth = width / 2.0;
    const midHeigth = height / 2.0;

    ctx.clearRect(0.0, 0.0, width, height);

    // Background Arc
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(69,136,193,1.0)';
    ctx.lineWidth = 10;
    ctx.arc(midWidth, midHeigth, midHeigth - 15, this.toRadians(150), this.toRadians(30), false);
    ctx.lineCap = 'butt';
    ctx.stroke();

    // Draw Arc
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(157,215,242,1.0)';
    ctx.lineWidth = 15;
    ctx.arc(midWidth, midHeigth, midHeigth - 15, this.toRadians(150), this.toRadians(150 + this.degrees), false);
    ctx.lineCap = 'butt';
    ctx.stroke();

    //
    ctx.fillStyle = 'rgba(28,167,79,1.0)';
    ctx.font = 'normal 30px Arial';
    //let text = ((this.degrees / 240) * this.maxValue).toFixed(0);
    const text = this.value.toFixed(0) + 'W';

    ctx.fillText(text, midWidth - ctx.measureText(text).width / 2.0, midHeigth + 15);
    ctx.font = 'lighter small-caps 14px Arial';
    ctx.fillText(this.unitText, midWidth - ctx.measureText(this.unitText).width / 2.0, midHeigth + 15 + 30 );

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

  // Draw simple debug box
  private drawDebugBox(ctx, x1, y1, x2, y2) {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'red';
    ctx.strokeRect(x1, y1, x2, y2);
    ctx.restore();
  }

  // Omrekenen graden naar radialen
  private toRadians(degrees: number): number {
    return degrees * Math.PI / 180;
  }


}
