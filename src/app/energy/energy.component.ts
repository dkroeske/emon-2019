import {Component, Input, OnInit} from '@angular/core';
import {EnergyService} from '../services/energy.service';
import {interval} from 'rxjs';
import {PowerItem} from '../models/power.model';
import {EnergyItem} from '../models/energy.model';

@Component({
  selector: 'app-energy',
  templateUrl: './energy.component.html',
  styleUrls: ['./energy.component.scss']
})
export class EnergyComponent implements OnInit {

  energySeries: EnergyItem[];

  @Input() signature;

  constructor(private energyService: EnergyService) { }

  ngOnInit() {
    this.getPolledEnergy();
    interval(10000).subscribe( () => {
      this.getPolledEnergy();
    });
  }

  getPolledEnergy() {

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7 );
    const endDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(59, 59, 59, 0);

    this.energyService.getEnergySeries(this.signature, startDate, endDate)
      .subscribe((energySeries: EnergyItem[]) => {
        this.energySeries = energySeries;
      });
  }

}
