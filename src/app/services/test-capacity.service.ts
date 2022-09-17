import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponsePayload } from '../models/response-payload';

@Injectable({
  providedIn: 'root'
})
export class TestCapacityService {

   constructor(private http: HttpClient) { }

    // List test năng lực
    getAllTestCapacity(): Observable<ResponsePayload> {
      return this.http.get<ResponsePayload>(`${environment.capacityListUrl}`);
    }
    SearchTestCapacity(data: string): Observable<ResponsePayload> {
      return this.http.get<ResponsePayload>(`${environment.capacityListUrl}?q=${data}`);
    }
}
