import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ServiceService} from "../services/service.service";
import {Router} from "@angular/router";
import {Service} from "../model/service.model";
import {CollaborateurService} from "../services/collaborateur.service";
import {Collaborateur} from "../model/collaborateur.model";

@Component({
  selector: 'app-new-collaborateur',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './new-collaborateur.component.html',
  styleUrl: './new-collaborateur.component.css'
})
export class NewCollaborateurComponent implements OnInit{
  collaborateurFormGroup!:FormGroup;
  constructor(private fb:FormBuilder,private collaborateurService:CollaborateurService,private router:Router,private s:ServiceService) {
  }
  ngOnInit() {
    this.collaborateurFormGroup=this.fb.group({
      nom : this.fb.control(null,[Validators.required]),
      prenom : this.fb.control(null,[Validators.required]),
      serviceName : this.fb.control(null,[Validators.required])
    });
  }
  handleAddCollaborateur() {
    let c:Collaborateur=this.collaborateurFormGroup.value;
    this.collaborateurService.saveCollaborateur(c.serviceName,c).subscribe({
      next:(data)=>{
        alert("Le service est ajouté avec succès !");
        this.collaborateurFormGroup.reset();
        this.router.navigateByUrl("/admin/collaborateurs");
      },error:err=> {
        alert("Le service que vous avez saisi n'existe pas, vous devez d'abord le créer. Ou le collaborateur que vous avez saisi existe déjà dans ce service !");
      }
    });
  }
}

