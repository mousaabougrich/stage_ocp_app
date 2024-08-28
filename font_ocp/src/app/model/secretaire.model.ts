import {Service} from "./service.model";


export interface Secretaire{
  nom:string;
  prenom:string;
  email:string;
  password:string;
  serviceName:Service;
}
