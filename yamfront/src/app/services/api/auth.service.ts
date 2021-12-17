import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private BASE_URL = environment.BASE_URL;
  private headersApplicationJson = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  loginCheck(creds){
    return this.http.post(this.BASE_URL + 'login_check' ,creds);
  }
}
