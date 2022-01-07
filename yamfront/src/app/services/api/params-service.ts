import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class ParamsService{
  private BASE_URL = environment.BASE_URL;
  private headersApplicationJson = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }
  listCamionsSelect(){
    return this.http.get(this.BASE_URL + 'listCamions' , {headers: this.headersApplicationJson});
  }
  listTypeCamionsSelect(){
    return this.http.get(this.BASE_URL + 'listTypesCamions' , {headers: this.headersApplicationJson});
  }
  listTypePermisSelect(){
    return this.http.get(this.BASE_URL + 'type_permis' , {headers: this.headersApplicationJson});
  }
  listTypesCamions(){
    return this.http.get(this.BASE_URL + 'listTypesCamions' , {headers: this.headersApplicationJson});
  }
  listTypeCamionTonne(){
    return this.http.get(this.BASE_URL + 'listTypeCamionTonne' , {headers: this.headersApplicationJson});
  }
  listMarques(){
    return this.http.get(this.BASE_URL + 'listMarques' , {headers: this.headersApplicationJson});
  }
  listModeles(){
    return this.http.get(this.BASE_URL + 'listModeles' , {headers: this.headersApplicationJson});
  }
  listChauffeursSelect(params=''){
    return this.http.get(this.BASE_URL + 'listChauffeursSelect'+params , {headers: this.headersApplicationJson});
  }
  detailsModelePiece(id){
    return this.http.get(this.BASE_URL + 'detailsModele/'+id , {headers: this.headersApplicationJson});
  }
 }
