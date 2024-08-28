import { Injectable } from '@angular/core';
import {Secretaire} from "../model/secretaire.model";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Service} from "../model/service.model";

@Injectable({
  providedIn: 'root'
})
export class SecretaireService {

  backendHost:string="http://localhost:8082";
  private secretaires! : Array<Secretaire>;
  constructor(private http:HttpClient) {
  }


  public getSecretaires():Observable<Array<Secretaire>>{
    return this.http.get<Array<Secretaire>>(this.backendHost+"/api/secretaires/all")
  }

  public searchSecretaires(keyword:string):Observable<Array<Secretaire>>{
    return this.http.get<Array<Secretaire>>(this.backendHost+"/api/secretaires/all/search?keyword="+keyword)
  }
  public saveSecretaire(s:Service,sec:Secretaire):Observable<Secretaire>{
    return this.http.post<Secretaire>(this.backendHost+"/api/secretaires/add?serviceName="+s,sec)
  }
  public deleteSecretaire(nom:string,prenom:string,email:string){
    return this.http.delete(this.backendHost+"/api/secretaires/delete?nom="+nom+"&prenom="+prenom+"&email="+email);
  }
  public updateSecretaire(nom:string,prenom:string,email:string,sec:Secretaire,s:string):Observable<Secretaire>{
    return this.http.put<Secretaire>(this.backendHost+"/api/secretaires/update?nom="+nom+"&prenom="+prenom+"&email="+email+"&serviceName="+s,sec);
  }
}
