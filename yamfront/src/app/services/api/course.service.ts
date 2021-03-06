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
  validerCourse(body){
    return this.http.post(this.BASE_URL + 'validerCourse' , body,{headers: this.headersApplicationJson});
  }

  annulerCourse(id){
    return this.http.get(this.BASE_URL + 'annulerCourse/' + id ,{headers: this.headersFormData});
  }

  lancerCourse(id){
    return this.http.get(this.BASE_URL + 'lancerCourse/' + id ,{headers: this.headersFormData});
  }
  terminerCourse(body){
    return this.http.post(this.BASE_URL + 'terminerCourse'  , body, {headers: this.headersFormData});
  }
  reprogrammerCourse(body){
    return this.http.post(this.BASE_URL + 'reprogrammerCourse'  , body, {headers: this.headersFormData});
  }

  remplacerChauffeur(body){
    return this.http.post(this.BASE_URL + 'remplacerChauffeur'  , body, {headers: this.headersFormData});
  }

}

