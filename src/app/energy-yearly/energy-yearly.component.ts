import {Component, Input, OnInit} from '@angular/core';
import {EnergyItem} from '../models/energy.model';
import {EnergyService} from '../services/energy.service';
import {interval} from 'rxjs';

@Component({
  selector: 'app-energy-yearly',
  templateUrl: './energy-yearly.component.html',
  styleUrls: ['./energy-yearly.component.scss']
})
export class EnergyYearlyComponent implements OnInit {

  energySeries: EnergyItem[];

  @Input() signature;

  constructor(private energyService: EnergyService) { }

  ngOnInit() {
    this.getPolledEnergy();
    interval(60000).subscribe( () => {
      this.getPolledEnergy();
    });
  }

  getPolledEnergy() {

    // Today
    const startDate = new Date();
    // First day of year
    const fd = new Date(startDate.getFullYear(), 0, 1, 0, 0, 0);
    // Last day of year
    const ld = new Date(startDate.getFullYear(), 11, 31, 23, 59, 59 );
    console.log(fd);
    console.log(ld);

    this.energyService.getEnergySeries(this.signature, fd, ld, 'monthly')
      .subscribe((energySeries: EnergyItem[]) => {
        console.table(energySeries);
        this.energySeries = energySeries;
      });
  }


}
