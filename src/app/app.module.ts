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
import { GaugeComponent } from './gauge/gauge.component';
import {InfoService} from './services/info.service';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    DailyPowerGraphComponent,
    DailypowerComponent,
    GaugeComponent,
    InfoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [PowerService, InfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
