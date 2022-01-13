import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CamionService{
  private BASE_URL = environment.BASE_URL;
  private headersApplicationJson = new HttpHeaders({'Content-type': 'application/json'});
  private headersFormData = new HttpHeaders({ Accept: '*/*', });

  constructor(private http: HttpClient) { }

  listCamion(filter = ''){
    return this.http.get(this.BASE_URL + 'listCamions'+ filter , {headers: this.headersApplicationJson});
  }

  addCamion(body){
    return this.http.post(this.BASE_URL + 'camion/add' , body,{headers: this.headersFormData});
  }

  archiverCamion(body){
    return this.http.post(this.BASE_URL + 'archiverCamion' , body,{headers: this.headersFormData});
  }

  listAllCamions(filter=''){
    return this.http.get(this.BASE_URL + 'listAllCamions?isDeleted=false'+filter ,{headers: this.headersFormData});
  }

  detailsCamion(id){
    return this.http.get(this.BASE_URL + 'fullDetailsCamion/'+id ,{headers: this.headersFormData});
  }

  changeChauffeur(body){
    return this.http.post(this.BASE_URL + 'changeChauffeur' ,body,{headers: this.headersFormData});
  }
}
