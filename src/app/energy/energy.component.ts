import {Component, Input, OnInit} from '@angular/core';
import {EnergyService} from '../services/energy.service';
import {interval} from 'rxjs';
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

    // Today
    const startDate = new Date();
    // First day month
    const fd = new Date(startDate.getFullYear(), startDate.getMonth(), 1, 0, 0, 0);
    // Last day of month
    const ld = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59 );

    this.energyService.getEnergySeries(this.signature, fd, ld, 'daily')
      .subscribe((energySeries: EnergyItem[]) => {
        this.energySeries = energySeries;
      });
  }

}
