import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponsePayload } from '../models/response-payload';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  // Thêm team
  addTeam(data: any): Observable<ResponsePayload> {
    const headers = new HttpHeaders();
    return this.http.post<ResponsePayload>(`${environment.teamListUrl}/add-team`, data, {
      headers: headers
    });
  }

  // Lấy ra chi tiết đội thi
  getTeamDetail(team_id: any): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>(`${environment.teamListUrl}/${team_id}`);
  }
}
