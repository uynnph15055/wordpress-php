import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponsePayload } from '../models/response-payload';

@Injectable({
  providedIn: 'root'
})
export class RoundService {

  constructor(private http: HttpClient) { }

  getRoundWhereId(id: any): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>(environment.roundListUrl + '/' + id);
  }
}
