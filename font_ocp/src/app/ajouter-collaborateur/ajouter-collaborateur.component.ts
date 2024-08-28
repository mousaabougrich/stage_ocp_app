import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CollaborateurService} from "../services/collaborateur.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ServiceService} from "../services/service.service";
import {Collaborateur} from "../model/collaborateur.model";

@Component({
  selector: 'app-ajouter-collaborateur',
  standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './ajouter-collaborateur.component.html',
  styleUrl: './ajouter-collaborateur.component.css'
})
export class AjouterCollaborateurComponent {
  serviceName!:string;
  collaborateurFormGroup!:FormGroup;
  constructor(private fb:FormBuilder,private collaborateurService:CollaborateurService,private router:Router,private route:ActivatedRoute) {
    this.serviceName=this.route.snapshot.params['serviceName'];
  }
  ngOnInit() {
    this.collaborateurFormGroup=this.fb.group({
      nom : this.fb.control(null,[Validators.required]),
      prenom : this.fb.control(null,[Validators.required]),
      serviceName : this.fb.control(this.serviceName,[Validators.required])
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
        alert("Le collaborateur que vous avez saisi existe déjà dans ce service !");
      }
    });
  }
}


