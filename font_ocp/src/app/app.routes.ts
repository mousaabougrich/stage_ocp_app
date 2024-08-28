import { Routes } from '@angular/router';

import {LesservicesComponent} from "./lesservices/lesservices.component";
import {CollaborateursComponent} from "./collaborateurs/collaborateurs.component";
import {PlanningComponent} from "./planning/planning.component";
//import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {authentificationGuard} from "./guards/authentification.guard";
import {NewServiceComponent} from "./new-service/new-service.component";
import {EditServiceComponent} from "./edit-service/edit-service.component";
import {NewCollaborateurComponent} from "./new-collaborateur/new-collaborateur.component";
import {EditCollaborateurComponent} from "./edit-collaborateur/edit-collaborateur.component";
import {SecretairesComponent} from "./secretaires/secretaires.component";
import {NewSecretaireComponent} from "./new-secretaire/new-secretaire.component";
import {EditSecretaireComponent} from "./edit-secretaire/edit-secretaire.component";
import {AjouterSecretaireComponent} from "./ajouter-secretaire/ajouter-secretaire.component";
import {AjouterCollaborateurComponent} from "./ajouter-collaborateur/ajouter-collaborateur.component";
import {PComponent} from "./p/p.component";
import {PAComponent} from "./pa/pa.component";
import {PlanningaComponent} from "./planninga/planninga.component";
import {DisponibleComponent} from "./disponible/disponible.component";

export const routes: Routes = [
 // {path :"login", component:LoginComponent},
 // {path :"", component:LoginComponent},
  {path :"admin", component:AdminTemplateComponent,canActivate:[authentificationGuard], children: [
      {path :"lesservices", component:LesservicesComponent},
      {path :"collaborateurs", component:CollaborateursComponent},
      {path :"planning", component:PlanningComponent},
      {path :"planninga", component:PlanningaComponent},
      {path :"newService", component:NewServiceComponent},
      {path :"editService/:nom/:id_s", component:EditServiceComponent},
      {path :"newCollaborateur", component:NewCollaborateurComponent},
      {path :"editCollaborateur/:id_col/:nom/:prenom/:serviceName", component:EditCollaborateurComponent},
      {path :"secretaires", component:SecretairesComponent},
      {path :"newSecretaire", component:NewSecretaireComponent},
      {path :"editSecretaire/:nom/:prenom/:email/:password/:serviceName", component:EditSecretaireComponent},
      {path :"ajouterSecretaire/:serviceName", component:AjouterSecretaireComponent},
      {path :"ajouterCollaborateur/:serviceName", component:AjouterCollaborateurComponent},
      {path :"p/:nom", component:PComponent},
      {path :"pa/:nom", component:PAComponent},
      {path :"disponible/:nom", component:DisponibleComponent}
    ]},
  {path :"planning", component:PlanningComponent},
  {path :"p/:nom", component:PComponent},
  {path :"disponible/:nom", component:DisponibleComponent}
];
