import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { jwtApiUrl, publicApiUrl } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.userService.getUserValue();
    const jwtToken = this.userService.getJwtToken();    
    const isLoggedin = user && jwtToken;
    const isJwtApiPublic = request.url.startsWith(publicApiUrl);
    const isJwtApiV1 = request.url.startsWith(jwtApiUrl);
    if(isLoggedin && (isJwtApiV1 || isJwtApiPublic)){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
    }
    return next.handle(request);
  }
}
