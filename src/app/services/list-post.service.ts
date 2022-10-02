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
  // Get all list post

  getHotPost() : Observable<ResponsePayload>{
    return this.http.get<ResponsePayload>(`${environment.postListUrl}?postHot=hot`);
  }

  getPostByCategory(data: string) : Observable<ResponsePayload>{
    return this.http.get<ResponsePayload>(`${environment.postListUrl}?post=${data}`);
  }
  
  // get detail post
  getPostBySlug(slug: any): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>(`${environment.postListUrl}/${slug}`);
  }

  // search
  searchPost(keyword: any): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>(`${environment.postListUrl}?keyword=${keyword}`);
  } 

  uploadCV(data: any): Observable<ResponsePayload> {
    return this.http.post<ResponsePayload>(`${environment.candidateUrl}/add`, data);
  }

  searchPostRecruitment(keyword: string):Observable<ResponsePayload>{
    return this.http.get<ResponsePayload>(`${environment.postListUrl}?post=post-recruitment&keyword=${keyword}`);
  } 
}
