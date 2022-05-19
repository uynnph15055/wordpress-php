import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponsePayload } from '../models/response-payload';

@Injectable({
  providedIn: 'root'
})
export class RoundService {

  constructor(private http: HttpClient) { }

  getRoundWhereId(id: any): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>(environment.roundListUrl + '/' + id);
  }

  // Get Thông tin đội thông qua id vòng thi
  getInfoTeamFromContestId(round_id: any): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>(`${environment.roundV1Url}/${round_id}/team-me`);
  }

  // Get Info exam
  getInfoExamRound(round: Object): Observable<ResponsePayload> {
    return this.http.post<ResponsePayload>(`${environment.takeExamUrl}/student`, round);
  }

  // Sinh viên nộp bài 
  submitExam(resultExam: Object): Observable<ResponsePayload> {
    const headers = new HttpHeaders();
    return this.http.post<ResponsePayload>(`${environment.takeExamUrl}/student-submit`, resultExam, {
      headers: headers
    });
  }

  // Trả kết quả của vòng thi
  getResultRound(round_id: number) {
    return this.http.get<ResponsePayload>(`${environment.publicApiUrl}/contest/round/${round_id}/result`)
  }
}
