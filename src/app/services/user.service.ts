import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponsePayload } from '../models/response-payload';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject:  BehaviorSubject<User>;
  private jwtToken: BehaviorSubject<string>;
  public user: Observable<User | null>;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.jwtToken = new BehaviorSubject<string>(localStorage.getItem('auth_token') || "");
    this.user = this.userSubject.asObservable();
   }

   public getUserValue(){
     return this.userSubject.value;
   }

   public getJwtToken(){
     return this.jwtToken.value;
   }

   login(authToken: string){
    return this.http.post<ResponsePayload>(environment.loginUrl, {token: authToken})
      .pipe(map(response => {
        if(response.status == true){
          localStorage.setItem("user", JSON.stringify(response.payload!.user));
          localStorage.setItem('auth_token', response.payload!.token);
          localStorage.setItem('token_type', JSON.stringify(response.payload!.token_type));
          this.userSubject.next(response.payload.user);
          this.jwtToken.next(response.payload.token);
        }

        return response.status;
      }));
   }

   logout(){
    localStorage.removeItem("user");
    localStorage.removeItem('auth_token')
    localStorage.removeItem('token_type')
    this.userSubject.next(JSON.parse('{}'));
    this.jwtToken.next("");
    this.router.navigate(['/login']);
   }

   listUser(): Observable<Array<User>>{
    return this.http.get<Array<User>>(environment.userListUrl);
   }

}
