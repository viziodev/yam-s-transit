import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class PiecesService{

  private BASE_URL = environment.BASE_URL;
  private headersApplicationJson = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  listPieces(page= 1){
    return this.http.get(this.BASE_URL + 'listPieces?page=' + page , {headers: this.headersApplicationJson});
  }
}
