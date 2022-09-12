import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponsePayload } from '../models/response-payload';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentsService {

  constructor(private http: HttpClient) { }

  getAll() : Observable<ResponsePayload>  {
    return this.http.get<ResponsePayload>(`${environment.recruitment}`);
  }

  // Gọi ra tất cả các đặt tuyển dụng
  getAllRecruitment(): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>(`${environment.recruitment}`);
  }

  // search recruitment
  filterRecruitmentSkill(skill: number): Observable<ResponsePayload>{
    return this.http.get<ResponsePayload>(`${environment.recruitment}?skill_id=${skill}`);
  }

  // Chi tiết một đợt tuyển dụng
  getRecruitmentDetail(rescruitment_id: any): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>(`${environment.recruitment}/${rescruitment_id}`);
  }

  //  Filter recruitment
  filterRecruitment(keyword:string , major_id: number = 0 , status: number = 0):Observable<ResponsePayload>{
    let majorChange =  major_id == 0 ? '' : major_id;
    let statusChange =  status == 0 ? '' : status;
    return this.http.get<ResponsePayload>(`${environment.recruitment}?progress="registration_date"&keyword=${keyword}&major_id=${majorChange}&recruitmentHot=${statusChange}`);
  }
}
