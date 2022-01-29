import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService{
  private BASE_URL = environment.BASE_URL;
  private headersApplicationJson = new HttpHeaders({'Content-type': 'application/json'});
  private headersFormData = new HttpHeaders({ Accept: '*/*', });

  constructor(private http: HttpClient) { }


  addCourse(body){
    return this.http.post(this.BASE_URL + 'addCourse' , body,{headers: this.headersFormData});
  }
  listCourse(filter= ''){
    return this.http.get(this.BASE_URL + 'lc' + filter,{headers: this.headersFormData});
  }

  getCamionsDispo(body){
    return this.http.post(this.BASE_URL + 'getCamionsDispo', body, {headers: this.headersFormData});
  }

}

