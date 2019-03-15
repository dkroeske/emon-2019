import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PowerItem} from '../models/power.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  readonly url = 'https://api.emon.ovh:8080';

  constructor(private http: HttpClient) {}

  getInfo(signature: string): Observable<any> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    let params = new HttpParams();

    signature ? params = params.append('signature', signature) : {};

    return this.http.get<any>(this.url + '/api/info', {headers: headers, params: params})
      .pipe(
        map( (data) => {
          return data;
        })
      );
  }

}
