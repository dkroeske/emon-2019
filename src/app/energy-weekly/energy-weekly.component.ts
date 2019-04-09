import {Component, Input, OnInit} from '@angular/core';
import {EnergyItem} from '../models/energy.model';
import {EnergyService} from '../services/energy.service';
import {interval} from 'rxjs';

@Component({
  selector: 'app-energy-weekly',
  templateUrl: './energy-weekly.component.html',
  styleUrls: ['./energy-weekly.component.scss']
})
export class EnergyWeeklyComponent implements OnInit {

  energySeries: EnergyItem[];
  title: string = '..';

  @Input() signature;

  constructor(private energyService: EnergyService) { }

  ngOnInit() {
    this.title = 'Energy last 7 days';
    this.getPolledEnergy();
    interval(10000).subscribe( () => {
      this.getPolledEnergy();
    });
  }

  getPolledEnergy() {
    // Today
    const startDate = new Date();
    // Today minus 7 days
    const fd = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 7, 0, 0, 0 );
    // Today
    const ld = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 23, 59, 59 );

    this.energyService.getEnergySeries(this.signature, fd, ld, 'daily')
      .subscribe((energySeries: EnergyItem[]) => {
        this.energySeries = energySeries;
      });
  }

}
