import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChauffeurService{
  private BASE_URL = environment.BASE_URL;
  private headersApplicationJson = new HttpHeaders({'Content-type': 'application/json'});
  private headersFormData = new HttpHeaders({ Accept: '*/*', });

  constructor(private http: HttpClient) { }

  listChauffeursSelect(){
     return this.http.get(this.BASE_URL + 'listChauffeursSelect' , {headers: this.headersApplicationJson});
  }

  listAllChauffeurs(filtre=''){
     return this.http.get(this.BASE_URL + 'listAllChauffeurs?isDeleted=false'+filtre , {headers: this.headersApplicationJson});
  }

  detailsChauffeur(id){
     return this.http.get(this.BASE_URL + 'detailsChauffeur/'+id , {headers: this.headersApplicationJson});
  }

  addChauffeurs(body){
     return this.http.post(this.BASE_URL + 'chauffeur/add' , body,{headers: this.headersFormData});
  }
  filtreChauffeurs(body){
     return this.http.post(this.BASE_URL + 'filtreChauffeurs' , body,{headers: this.headersFormData});
  }

  archiverChauffeur(body){
     return this.http.post(this.BASE_URL + 'archiverChauffeur' , body,{headers: this.headersFormData});
  }

}
