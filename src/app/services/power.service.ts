import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Power} from '../models/power.model';

@Injectable({
  providedIn: 'root'
})
export class PowerService {

  readonly url = 'https://emon.ovh:8080/api/power?limit=10';

  constructor(private http: HttpClient) {}

  getPower(): Observable<Power[]> {
    return this.http.get<Power[]>(this.url)
      .pipe( map( powerItem => {
          return powerItem;
      }));
  }

}
