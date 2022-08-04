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
  getAllRecruitment(): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>(`${environment.recruitment}`);
  }

  // Chi tiết một đợt tuyển dụng
  getRecruitmentDetail(rescruitment_id: number): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>(`${environment.recruitment}/${rescruitment_id}`);
  }
}
