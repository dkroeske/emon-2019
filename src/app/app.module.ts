import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './MaterialModule';
import {PowerService} from './services/power.service';
import { DailyPowerGraphComponent } from './dailypower/dailypowergraph/daily-power-graph.component';
import { DailypowerComponent } from './dailypower/dailypower.component';
import { GaugeComponent } from './live-power/power-gauge/gauge.component';
import { InfoService} from './services/info.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { LivePowerComponent } from './live-power/live-power.component';
import { EnergyComponent } from './energy/energy.component';
import { EnergygraphComponent } from './energy/energygraph/energygraph.component';

@NgModule({
  declarations: [
    AppComponent,
    DailyPowerGraphComponent,
    DailypowerComponent,
    GaugeComponent,
    DashboardComponent,
    LivePowerComponent,
    EnergyComponent,
    EnergygraphComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ],
  providers: [PowerService, InfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
