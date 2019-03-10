import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { Chart } from '../../../../node_modules/chart.js';
import {PowerItem} from '../../models/power.model';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-daily-power-graph',
  templateUrl: './daily-power-graph.component.html',
  styleUrls: ['./daily-power-graph.component.scss']
})
export class DailyPowerGraphComponent implements OnInit, OnChanges {

  @ViewChild('lineChart') private chartRef;
  @Input() dataSeries: PowerItem[];

  chart: any;

  constructor() { }

  ngOnChanges( changes: SimpleChanges ) {
    if (changes.dataSeries.firstChange === false) {

      const produced: number[] = [];
      const consumed: number[] = [];

      this.dataSeries.forEach( item => {
        if ( item.value >= 0 ) {
          produced.push( item.value * 1000 );
          consumed.push( 0 );
        } else {
          produced.push( 0 );
          consumed.push( -1 * item.value * 1000 );
        }
      });

      this.chart.data.datasets[0].data = produced;
      this.chart.data.datasets[1].data = consumed;


      this.chart.data.labels = this.dataSeries.map( (item) => item.timestamp );

      this.chart.update();
    }
  }

  ngOnInit() {

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: [], // your labels array
        datasets: [
          {
            label: 'Produced',
            data: [], // Produced
            pointRadius: 0,
            borderColor: 'rgba(28,167,79,0.6)',
            backgroundColor: 'rgba(28,167,79,0.4)',
            fill: true
          },
          {
            label: 'Consumed',
            data: [], // consumed
            pointRadius: 0,
            borderColor: 'rgba(69,136,193,0.6)',
            backgroundColor: 'rgba(69,136,193,0.4)',
            fill: true
          },
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'hour'
            },
            display: true,
            gridLines: {
              display: true
            }
          }],
          yAxes: [{
            display: true,
            gridLines: {
              display: true
            },
            ticks: {
              beginAtZero: true,
              stepSize: 500
            },
          }],
        }
      }
    });
  }
}
