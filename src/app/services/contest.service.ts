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

  // Phân trang theo link
  getContestWherePage(url: string): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>(url);
  }

  getWhereStatusAndMajor(status: number, major_id: number): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>(`${environment.contestListUrl}?status=${status}&major_id=${major_id}`);
  }

  // Tìm kiếm cuộc thi
  searchContest(keyword: string): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>('http://127.0.0.1:8000/api/public/contests?q=' + keyword);
  }

  // Lọc theo chuyên ngành
  getWhereMajor(major_id: any): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>(`${environment.contestListUrl}?major_id=${major_id}`);
  }

  filterContest(keyword: string, major_id: number, status: number): Observable<ResponsePayload> {
    let valueStatus;
    let valueMajor;
    status == 0 ? valueStatus = '' : valueStatus = status;
    major_id == 0 ? valueMajor = '' : valueMajor = major_id;
    return this.http.get<ResponsePayload>(`${environment.contestListUrl}?status=${valueStatus}&major_id=${valueMajor}&q=${keyword}`)
  }

  // get list contest user has join
  getListContestHasJoin(): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>(`${environment.userListUrl}/contest-joined`);
  }

  filterContestHasLogin(keyword: string, major_id: number, status: number): Observable<ResponsePayload> {
    let valueStatus;
    let valueMajor;
    status == 0 ? valueStatus = '' : valueStatus = status;
    major_id == 0 ? valueMajor = '' : valueMajor = major_id;
    return this.http.get<ResponsePayload>(`${environment.userListUrl}/contest-joined?status=${valueStatus}&major_id=${valueMajor}&q=${keyword}`)
  }
}
