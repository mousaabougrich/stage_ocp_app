import {CollaborateursComponent} from "../collaborateurs/collaborateurs.component";
import {PlanningComponent} from "../planning/planning.component";
import {ServiceService} from "../services/service.service";
import {SecretairesComponent} from "../secretaires/secretaires.component";
import {Collaborateur} from "./collaborateur.model";

export interface Service{
  id_s:number;
  nom:string;
  collaborateurs:Collaborateur[];

}
export interface PageService{
  services:Service[];
  page : number;
  size : number;
  totalPages : number;
}
