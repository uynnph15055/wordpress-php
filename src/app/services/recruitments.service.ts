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
  getAllRecruitment(url : string): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>(`${environment.recruitment}?recruitmentHot=${url}`);
  }

  // search recruitment
  searchRecruitment(keyword : string): Observable<ResponsePayload>{
    
    return this.http.get<ResponsePayload>(`${environment.recruitment}?keyword=${keyword}`);
  }

  // Chi tiết một đợt tuyển dụng
  getRecruitmentDetail(rescruitment_id: any): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>(`${environment.recruitment}/${rescruitment_id}`);
  }

  //  Filter recruitment
  filterRecruitment(keyword:string , skill:number = 0 , major_id: number = 0 , status: number = 0):Observable<ResponsePayload>{
    let skillChange =  skill == 0 ? '' : skill;
    let majorChange =  major_id == 0 ? '' : major_id;
    let statusChange =  status == 0 ? '' : status;
    return this.http.get<ResponsePayload>(`${environment.recruitment}?progress="registration_date"&keyword=${keyword}&major_id=${majorChange}&skill=${skillChange}&status=${statusChange}`);
  }
}
