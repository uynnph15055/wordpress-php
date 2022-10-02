import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ResponsePayload } from "../models/response-payload";
import { ResponseCapacityHistory } from "../models/capacity";

@Injectable({
  providedIn: "root",
})
export class CapacityService {
  constructor(private http: HttpClient) {}

  // test năng lực theo id
  getWhereId(id: number): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>(`${environment.capacityListUrl}/${id}`);
  }

  // bài test liên quan
  getRelated({ capacity_id, ...args }: any): Observable<ResponsePayload> {
    const params = new HttpParams({
      fromObject: {
        ...args,
      },
    });
    return this.http.get<ResponsePayload>(`${environment.capacityListUrl}/${capacity_id}/related`, {
      params,
    });
  }

  // lịch sử làm bài
  getHistoryExam(capacity_id: number): Observable<ResponseCapacityHistory> {
    return this.http.post<ResponseCapacityHistory>(`${environment.takeExamUrl}/student-capacity-history`, {
      result_capacity_id: capacity_id,
    });
  }
}
