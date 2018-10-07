import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PowerLineChartComponent} from './power-line-chart/power-line-chart.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './MaterialModule';
import {PowerService} from './services/power.service';

@NgModule({
  declarations: [
    AppComponent,
    PowerLineChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [PowerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
