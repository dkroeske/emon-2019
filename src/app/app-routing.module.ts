import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DailypowerComponent} from './dailypower/dailypower.component';

const routes: Routes = [
  { path: '', component: DailypowerComponent },
  { path: '**',  redirectTo: '/', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
