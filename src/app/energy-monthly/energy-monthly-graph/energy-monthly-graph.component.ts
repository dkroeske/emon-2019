import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {EnergyItem} from '../../models/energy.model';
import { Chart } from '../../../../node_modules/chart.js';


@Component({
  selector: 'app-energy-monthly-graph',
  templateUrl: './energy-monthly-graph.component.html',
  styleUrls: ['./energy-monthly-graph.component.scss']
})
export class EnergyMonthlyGraphComponent implements OnInit, OnChanges {

  @ViewChild('energyBarChart') private chartRef;
  @Input() dataSeries: EnergyItem[];

  private chart: any;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataSeries.firstChange === false) {

      const produced: number[] = [];
      const consumed: number[] = [];

      this.dataSeries.forEach((item: EnergyItem) => {
        produced.push(item.produced);
        consumed.push(-1.0 * item.consumed);
      });

      this.chart.data.datasets[0].data = produced;
      this.chart.data.datasets[1].data = consumed;
      this.chart.data.labels = this.dataSeries.map((item) => item.startDate);

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
          text: 'Energy this month'
        },
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true
          }
        },
        scales: {
          xAxes: [{
            stacked: true,
            offset: true,
            type: 'time',
            ticks: {
              beginAtZero: true,
              fontSize: 12,
              fontFamily: 'HelveticaNeue, HelveticaNeue, Roboto, ArialRounded',
              autoSkip: false,
              minor: {
                fontSize: 12,
              }
            },
            time: {
              unit: 'day',
              round: 'day',
              displayFormats: {
                day: 'D MMM'
              },
            },
            tooltipFormat: 'D MMM YYYY',
            display: true,
            gridLines: {
              display: true
            }
          }],
          yAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true,
              fontSize: 12,
              fontFamily: 'HelveticaNeue, HelveticaNeue, Roboto, ArialRounded',
              autoSkip: false,
              minor: {
                fontSize: 12,
              }
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
