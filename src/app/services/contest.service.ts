import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponsePayload } from '../models/response-payload';

@Injectable({
  providedIn: 'root'
})
export class ContestService {

  constructor(private http: HttpClient) { }
  // Gọi tất cả các cuộc thi
  getAll(): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>(environment.contestListUrl);
  }

  // Lấy ra cuộc thi theo id
  getWhereId(id: any): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>(`${environment.contestListUrl}/${id}`);
  }

  // Gọi cuộc thi theo trạng thái
  getWhereStatus(status: number): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>(`${environment.contestListUrl}?status=${status}`);
  }

  // Tìm kiếm cuộc thi
  searchContest(keyword: any): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>(`${environment.contestListUrl}?keyword=${keyword}`);
  }

  // Lọc theo chuyên ngành
  getWhereMajor(major_id: any): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>(`${environment.contestListUrl}?major=${major_id}`);
  }
}
