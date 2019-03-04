import { Component, OnInit } from '@angular/core';
import {interval} from 'rxjs';
import {PowerService} from '../services/power.service';
import {PowerItem} from '../models/power.model';

const signature = '00000000d926eb43';


@Component({
  selector: 'app-dailypower',
  templateUrl: './dailypower.component.html',
  styleUrls: ['./dailypower.component.scss']
})
export class DailypowerComponent implements OnInit {


  powerSeries: PowerItem[];

  constructor(private powerService: PowerService) {
  }

  ngOnInit(): void {
    this.getPolledPower();
    interval(10000).subscribe( () => {
      this.getPolledPower();
    });
  }

  getPolledPower() {

    const startDate = new Date();
    const endDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    this.powerService.getPower(signature, startDate, endDate, 5)
      .subscribe((powerSeries: PowerItem[]) => {
        this.powerSeries = powerSeries;
      });
  }

}
