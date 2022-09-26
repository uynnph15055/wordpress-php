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
    // Lọc Capacity
    filterCapacity(keyword:string , major_id: number = 0 , status: boolean = false, skill:number = 0):Observable<ResponsePayload>{
      let majorChange =  major_id == 0 ? '' : major_id;
      let skillChange = skill == 0 ? '' : skill;
      return this.http.get<ResponsePayload>(`${environment.capacityListUrl}?q=${keyword}&major_id=${majorChange}&status_user_has_join_contest=${status}?skill_id=${skillChange}`);
    }
}
