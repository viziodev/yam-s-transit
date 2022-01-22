import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService{
  private BASE_URL = environment.BASE_URL;
  private headersApplicationJson = new HttpHeaders({'Content-type': 'application/json'});
  private headersFormData = new HttpHeaders({ Accept: '*/*', });

  constructor(private http: HttpClient) { }

  listClientSelect(){
    return this.http.get(this.BASE_URL + 'listClientSelect' , {headers: this.headersApplicationJson});
  }

  listAllClient(filtre=''){
    return this.http.get(this.BASE_URL + 'listAllClient?isDeleted=false'+filtre , {headers: this.headersApplicationJson});
  }

  listClients(filtre=''){
    return this.http.get(this.BASE_URL + 'listClients?isDeleted=false'+filtre , {headers: this.headersApplicationJson});
  }

  detailsClient(id){
    return this.http.get(this.BASE_URL + 'detailsClient/'+id , {headers: this.headersApplicationJson});
  }


  getClientFilter(filter){
    return this.http.get(this.BASE_URL + 'clients/'+filter , {headers: this.headersApplicationJson});
  }

  addClient(body){
    return this.http.post(this.BASE_URL + 'addClient' , body,{headers: this.headersFormData});
  }


  addContrat(body){
    return this.http.post(this.BASE_URL + 'addContrat' , body,{headers: this.headersFormData});
  }

  archiverClient(body){
    return this.http.post(this.BASE_URL + 'archiverClient' , body,{headers: this.headersFormData});
  }

  addPayment(body){
    return this.http.post(this.BASE_URL + 'addPaiement' , body,{headers: this.headersFormData});
  }
}

