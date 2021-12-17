import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilService{
  private BASE_URL = environment.BASE_URL;
  private headersApplicationJson = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  listChauffeursSelect(){
     return this.http.get(this.BASE_URL + 'listChauffeursSelect' , {headers: this.headersApplicationJson});
  }
}
