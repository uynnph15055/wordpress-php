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

  //Get list post width recuitment
}
