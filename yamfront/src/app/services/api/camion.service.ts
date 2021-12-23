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

  listCamion(){
    return this.http.get(this.BASE_URL + 'listChauffeursSelect' , {headers: this.headersApplicationJson});
  }

  addCamion(body){
    return this.http.post(this.BASE_URL + 'camion/add' , body,{headers: this.headersFormData});
  }
}
