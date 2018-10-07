import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { Chart } from '../../../node_modules/chart.js';
import {Observable, timer} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Power} from '../models/power.model';
import {PowerService} from '../services/power.service';

@Component({
  selector: 'app-power-line-chart',
  templateUrl: './power-line-chart.component.html',
  styleUrls: ['./power-line-chart.component.scss']
})
export class PowerLineChartComponent implements OnInit, OnChanges {
  @ViewChild('lineChart') private chartRef;
  chart: any;

  @Input() data: number[];

  constructor() { }

  ngOnChanges( changes: SimpleChanges ) {

    if (changes.data.firstChange === false) {
      let max = Math.max(...this.data);
      let min = Math.min(...this.data);
      console.log( max + ' ' + min );
      this.chart.data.datasets[0].data = this.data;
      this.chart.update();
    }
  }

  ngOnInit() {

    // this.polledTimer$ = timer(0, 2000).pipe(
    //   tap((timer_val) => {
    //     this.chart.data.datasets[0].data = this.data;
    //     this.chart.update();
    //   })
    // );
    //
    // this.polledTimer$.subscribe();

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // your labels array
        datasets: [
          {
            data: this.data, // your data array
            borderColor: '#00AEFF',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false,
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            display: false,
            gridLines: {
              display: false
            }
          }],
        }
      }
    });
  }

}
