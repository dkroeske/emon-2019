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
  actualPower = 0;
  unitLabel = '';
  infoLabel = '';
  valueLabel = '';


  constructor(private infoService: InfoService) {}

  ngOnInit() {
    this.getPolledInfo();
    interval(3000).subscribe(() => {
      this.getPolledInfo();
    });
  }

  getPolledInfo() {
    this.infoService.getInfo(this.signature).subscribe( res => {
      const pConsumed = res.p1.instantaneous_active_power[0].value;
      const pProduced = res.p1.instantaneous_active_power[1].value;

      this.actualPower = Math.abs(pConsumed - pProduced) * 1000;

      if ( pConsumed >= pProduced ) {
        this.infoLabel = 'Consuming';
      } else {
        this.infoLabel = 'Producing';
      }

      if ( this.actualPower > 1000 ) {
        this.valueLabel = (this.actualPower / 1000).toFixed(2);
        this.unitLabel = 'kW';
      } else {
        this.valueLabel = this.actualPower.toFixed(0);
        this.unitLabel = 'W';
      }
    });
  }


}
