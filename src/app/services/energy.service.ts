import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnergyItem} from '../models/energy.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnergyService {

  readonly url = 'https://api.emon.ovh:8080';

  constructor(private http: HttpClient) {}

  getEnergySeries(signature: string, startDate: Date, endDate: Date, interval: string = 'monthly'): Observable<EnergyItem[]> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    let params = new HttpParams();

    signature ? params = params.append('signature', signature) : {};
    interval ? params = params.append('interval', interval) : {};
    startDate ? params = params.append('startDate', startDate.toISOString()) : {};
    endDate ? params = params.append('endDate', endDate.toISOString()) : {};

    return this.http.get<any>(this.url + '/api/energySeries', {headers: headers, params: params})
      .pipe(
        map( (data) => {
          return data.map( (item) => {
            const energyItem = new EnergyItem(item.interval.start, item.interval.end, item.e_cons, item.e_prod, item.unit);
            return energyItem;
          });
        })
      );
  }

}
