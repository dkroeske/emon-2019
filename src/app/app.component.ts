import {Component, OnInit} from '@angular/core';
import {PowerService} from './services/power.service';
import {Observable, timer} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Power} from './models/power.model';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  polledPower$: number;
  polledUnit$: string;
  polledPowerArray: number[];

  updateCounter$: number;

  intervalSec = 60;

  polledTimer$: Observable<number>;

  constructor(private powerService: PowerService) {}

  ngOnInit() {

    //
    this.polledTimer$ = timer(0, 1000 / 10).pipe(
      tap((timer_val) => {

        this.updateCounter$ = 100 - (( (timer_val / 10)  % this.intervalSec) * 100.0 / 60.0);

        if (timer_val === 0 || ((timer_val / 10) % this.intervalSec) === 0) {
          this.powerService.getPower()
            .subscribe((power: Power[]) => {

              this.polledPowerArray = power.map( (item) => {
                  return item.p1.instantaneous_active_power[1].value -
                  item.p1.instantaneous_active_power[0].value;
              });

              const ip = this.polledPowerArray[0];

              if ( Math.abs(ip) >= 1.0 ) {
                this.polledPower$ = ip;
                this.polledUnit$ = 'kW';
              } else {
                this.polledPower$ = ip * 1000;
                this.polledUnit$ = 'W';
              }
            });
        }
      })
    );

    // Start
    this.polledTimer$.subscribe();
  }

}
