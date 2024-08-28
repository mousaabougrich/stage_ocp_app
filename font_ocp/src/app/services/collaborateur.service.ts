import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Service} from "../model/service.model";
import {Collaborateur} from "../model/collaborateur.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CollaborateurService {

  backendHost:string="http://localhost:8082";
  private collaborateurs! : Array<Collaborateur>;

  constructor(private http:HttpClient) { }


  public getAllCollaborateurs():Observable<Array<Collaborateur>>{
    return this.http.get<Array<Collaborateur>>(this.backendHost+"/collaborateurs/all")
  }
  public getCollaborateursByservice(service:string):Observable<Array<Collaborateur>>{
    return this.http.get<Array<Collaborateur>>(this.backendHost+"/collaborateurs/service/getall/"+service);
  }
  public searchAllCollaborateurs(keyword:string):Observable<Array<Collaborateur>>{
    return this.http.get<Array<Collaborateur>>(this.backendHost+"/collaborateurs/all/search?keyword="+keyword)
  }

  public getCollaborateurs(s:string):Observable<Array<Collaborateur>>{
    return this.http.get<Array<Collaborateur>>(this.backendHost+"/collaborateurs/service/getall/"+s);
  }
  public searchCollaborateurs(keyword:string,s:string):Observable<Array<Collaborateur>>{
    return this.http.get<Array<Collaborateur>>(this.backendHost+"/collaborateurs/service/getall/"+s+"/search?keyword="+keyword);
  }

  public saveCollaborateur(s: Service, c: Collaborateur):Observable<Collaborateur>{
    return this.http.post<Collaborateur>(this.backendHost+"/collaborateurs/add?serviceName="+s,c);
  }

  public deleteCollaborateur(nom:string,prenom:string){
    return this.http.delete(this.backendHost+"/collaborateurs/delete?nom="+nom+"&prenom="+prenom);
  }

  public updateCollaborateur(nom:string,prenom:string,s:string,c:Collaborateur):Observable<Collaborateur>{
    return this.http.put<Collaborateur>(this.backendHost+"/collaborateurs/update?nom="+nom+"&prenom="+prenom+"&serviceName="+s,c);
  }

  public getAllServices():Observable<Array<Service>>{
    return this.http.get<Array<Service>>(this.backendHost+"/services/all")
  }

  public getAstreinte(service:string):Observable<Collaborateur>{
    return this.http.get<Collaborateur>(this.backendHost+"/collaborateurs/next/"+service);
  }
  public getCurrentAstreinte(service:string):Observable<Collaborateur>{
    return this.http.get<Collaborateur>(this.backendHost+"/collaborateurs/current/"+service);
  }
  public updateCurrent(nom:string,id:number):Observable<Collaborateur>{
    return this.http.put<Collaborateur>(this.backendHost+"/collaborateurs/up/"+nom+"/"+id,{});
  }
}

