import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponsePayload } from '../models/response-payload';

@Injectable({
  providedIn: 'root'
})
export class ListPostService {

  constructor(private http : HttpClient) { }

  // Get Post Where Category
  getPostWhereCate(cate: string) :Observable<ResponsePayload>{
    return this.http.get<ResponsePayload>(`${environment.postListUrl}?post=${cate}`)
  }

  // Get all list post
  getAllListPost() : Observable<ResponsePayload>{
    return this.http.get<ResponsePayload>(`${environment.postListUrl}`);
  }

  // Get post thuộc tuyển dụng
  getPostRecruitment() : Observable<ResponsePayload>{
    return this.http.get<ResponsePayload>(`${environment.postListUrl}?post=post-recruitment`);
  }
  // Get post thuộc cuộc thi
  getPostContest() : Observable<ResponsePayload>{
    return this.http.get<ResponsePayload>(`${environment.postListUrl}?post=post-contest`);
  }
  // Get post thuộc test năng lực
  getPostCapacity() : Observable<ResponsePayload>{
    return this.http.get<ResponsePayload>(`${environment.postListUrl}?post=post-capacity`);
  }
  
}
