import { Component, OnInit } from '@angular/core';
import {interval} from 'rxjs';

@Component({
  selector: 'app-power-gauge',
  templateUrl: './power-gauge.component.html',
  styleUrls: ['./power-gauge.component.scss']
})
export class PowerGaugeComponent implements OnInit {

  maxValue = 5000;
  unitText = 'WATT';
  value = 0;
  values = [0, 100, 1000, 2500, 4000, 5000];
  index = 0;

  constructor() { }

  ngOnInit() {
    interval(2500).subscribe( () => {
      this.value = this.values[this.index];
      this.index++;
      this.index %= 6;
    });
  }

}
