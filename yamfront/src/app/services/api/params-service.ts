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
    return this.http.get(this.BASE_URL + 'camions' , {headers: this.headersApplicationJson});
  }
  listTypePermisSelect(){
    return this.http.get(this.BASE_URL + 'type_permis' , {headers: this.headersApplicationJson});
  }
}
