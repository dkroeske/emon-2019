import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  signature = '00000000d926eb43';

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      console.log(matches)
      if (matches) {
        return [
          { title: 'Consumed', component: 'PowerConsumed', cols: 2, rows: 1 },
          { title: 'Produced', component: 'PowerProduced', cols: 2, rows: 1 },
          { title: 'Series Today', component: 'PowerSeries', cols: 2, rows: 1 },
        ];
      }

      return [
        { title: 'Consumed', component: 'PowerConsumed', cols: 1, rows: 1 },
        { title: 'Produced', component: 'PowerProduced', cols: 1, rows: 1 },
        { title: 'Series Today', component: 'PowerSeries', cols: 2, rows: 1 },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
  }

}
