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
      const cors = 'Bearer ' + token;
      console.log(authHeader);
      const newReq = req.clone({setHeaders: {Authorization: authHeader, 'Access-Control-Allow-Credentials':'true', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT', "Access-Control-Allow-Headers": 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'  }});
      return next.handle(newReq);
    }
    return next.handle(req);
  }

}
