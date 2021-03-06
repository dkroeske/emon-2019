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
import { EnergyWeeklyComponent } from './energy-weekly/energy-weekly.component';
import { EnergyWeeklyGraphComponent } from './energy-weekly/energy-weekly-graph/energy-weekly-graph.component';
import { EnergyMonthlyComponent } from './energy-monthly/energy-monthly.component';
import { EnergyMonthlyGraphComponent } from './energy-monthly/energy-monthly-graph/energy-monthly-graph.component';
import { EnergyYearlyGraphComponent } from './energy-yearly/energy-yearly-graph/energy-yearly-graph.component';
import { EnergyYearlyComponent } from './energy-yearly/energy-yearly.component';

@NgModule({
  declarations: [
    AppComponent,
    DailyPowerGraphComponent,
    DailypowerComponent,
    GaugeComponent,
    DashboardComponent,
    LivePowerComponent,
    EnergyWeeklyComponent,
    EnergyWeeklyGraphComponent,
    EnergyMonthlyComponent,
    EnergyMonthlyGraphComponent,
    EnergyYearlyGraphComponent,
    EnergyYearlyComponent,
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
