import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponsePayload } from '../models/response-payload';

@Injectable({
  providedIn: 'root'
})
export class CapacityService {

  constructor(private http: HttpClient) { }

  // test năng lực theo id
  getWhereId(id: number): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>(`${environment.capacityListUrl}/${id}`);
  }
}
