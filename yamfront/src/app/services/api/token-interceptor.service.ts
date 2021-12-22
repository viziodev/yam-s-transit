import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TokenService} from "./token-service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  constructor(private localStorageToken: TokenService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     if (this.localStorageToken.getLocalStorageToken()){
      const token = this.localStorageToken.getLocalStorageToken();
      const authHeader = 'Bearer ' + token;
      console.log(authHeader);
      const newReq = req.clone({setHeaders: {Authorization: authHeader}});
      return next.handle(newReq);
    }
    return next.handle(req);
  }

}
