import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {EnergyItem} from '../../models/energy.model';
import { Chart } from '../../../../node_modules/chart.js';

@Component({
  selector: 'app-energygraph',
  templateUrl: './energygraph.component.html',
  styleUrls: ['./energygraph.component.scss']
})
export class EnergygraphComponent implements OnInit, OnChanges {

  @ViewChild('barChart') private chartRef;
  @Input() dataSeries: EnergyItem[];

  chart: any;

  constructor() { }

  ngOnChanges( changes: SimpleChanges ) {
    if (changes.dataSeries.firstChange === false) {

      const produced: number[] = [];
      const consumed: number[] = [];

      this.dataSeries.forEach( (item: EnergyItem) => {
        produced.push( item.produced );
        consumed.push( -1.0 * item.consumed );
      });

      this.chart.data.datasets[0].data = produced;
      this.chart.data.datasets[1].data = consumed;
      this.chart.data.labels = this.dataSeries.map( (item) => item.timestamp );

      this.chart.update();
    }
  }

  ngOnInit() {

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
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
        title: {
          display: true,
          text: 'Energy last 31 days'
        },
        legend: {
        },
        scales: {
          xAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true
            },
            type: 'time',
            time: {
              unit: 'day'
            },
            display: true,
            gridLines: {
              display: true
            }
          }],
          yAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true,
              stepSize: 5
            },
            scaleLabel: {
              labelString: 'Energy [kWh]',
              display: true
            },
            gridLines: {
              display: true
            },
          }],
        }
      }
    });
  }

}
