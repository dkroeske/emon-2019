import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, catchError, tap} from 'rxjs/operators';
import {PowerItem} from '../models/power.model';

@Injectable({
  providedIn: 'root'
})
export class PowerService {

  readonly url = 'https://api.emon.ovh:8080';

  constructor(private http: HttpClient) {}

  getPowerSeries(signature: string, startDate: Date, endDate: Date, interval: number ): Observable<PowerItem[]> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    let params = new HttpParams();

    signature ? params = params.append('signature', signature) : {};
    startDate ? params = params.append('startDate', startDate.toISOString()) : {};
    endDate ? params = params.append('endDate', endDate.toISOString()) : {};
    interval ? params = params.append('interval', interval.toString()) : {};


    return this.http.get<any>(this.url + '/api/powerSeries', {headers: headers, params: params})
    .pipe(
      map( (data) => {
          return data.map( (item) => {
            const pwr = item.avg_p_prod_kw - item.avg_p_cons_kw;
            const tm = item.startDate;
            const unit = 'kW';
            return new PowerItem(new Date(tm), pwr, unit);
        });
      })
    );
  }

}


