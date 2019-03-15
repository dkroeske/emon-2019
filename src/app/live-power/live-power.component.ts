import {Component, Input, OnInit} from '@angular/core';
import {InfoService} from '../services/info.service';
import {interval} from 'rxjs';
import {PowerItem} from '../models/power.model';

@Component({
  selector: 'app-live-power',
  templateUrl: './live-power.component.html',
  styleUrls: ['./live-power.component.scss']
})
export class LivePowerComponent implements OnInit {

  @Input() signature: '';
  @Input() index = '';
  actualPower = 0;

  constructor(private infoService: InfoService) {}

  ngOnInit() {
    this.getPolledInfo();
    interval(3000).subscribe(() => {
      this.getPolledInfo();
    });
  }

  getPolledInfo() {
    this.infoService.getInfo(this.signature).subscribe( res => {
      this.actualPower = res.p1.instantaneous_active_power[this.index].value * 1000;
    });
  }


}
