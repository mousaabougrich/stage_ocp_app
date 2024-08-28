import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CollaborateurService} from "../services/collaborateur.service";
import {Router} from "@angular/router";
import {ServiceService} from "../services/service.service";
import {Collaborateur} from "../model/collaborateur.model";
import {Service} from "../model/service.model";
import {SecretaireService} from "../services/secretaire.service";
import {Secretaire} from "../model/secretaire.model";

@Component({
  selector: 'app-new-secretaire',
  standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './new-secretaire.component.html',
  styleUrl: './new-secretaire.component.css'
})
export class NewSecretaireComponent implements OnInit{
  secretaireFormGroup!:FormGroup;
  constructor(private fb:FormBuilder,private secretaireService:SecretaireService,private router:Router) {
  }
  ngOnInit() {
    this.secretaireFormGroup=this.fb.group({
      nom : this.fb.control(null,[Validators.required]),
      prenom : this.fb.control(null,[Validators.required]),
      email : this.fb.control(null,[Validators.required,Validators.email]),
      password : this.fb.control(null,[Validators.required]),
      serviceName : this.fb.control(null,[Validators.required])
    });
  }
  handleAddSecretaire() {
    let s:Secretaire=this.secretaireFormGroup.value;
    this.secretaireService.saveSecretaire(s.serviceName,s).subscribe({
      next:(data)=>{
        alert("Secrétaire est ajouté avec succès !");
        this.secretaireFormGroup.reset();
        this.router.navigateByUrl("/admin/secretaires");
      },error:err=> {
        alert("Le service que vous avez saisi n'existe pas, vous devez d'abord le créer. Ou le service que vous avez saisi contient déjà secrétaire. Ou cet email existe déjà !");
      }
    });
  }
}

