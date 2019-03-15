import { Component, OnInit } from '@angular/core';
import {InfoService} from '../services/info.service';
import {interval} from 'rxjs';

const signature = '00000000d926eb43';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(private infoService: InfoService) {}

  smartmeterId = '';
  consumedActualPower = 0;
  producedActualPower = 0;

  ngOnInit() {
    this.getPolledInfo();
    interval(3000).subscribe(() => {
      this.getPolledInfo();
    });
  }

  getPolledInfo() {
    this.infoService.getInfo(signature).subscribe( res => {
      this.smartmeterId = res.p1.id;
      this.producedActualPower = res.p1.instantaneous_active_power[1].value * 1000;
      this.consumedActualPower = res.p1.instantaneous_active_power[0].value * 1000;
    });
  }

}
