import {Component, OnInit} from '@angular/core';
// @ts-ignore
import {NgIf} from "@angular/common";
// @ts-ignore
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
// @ts-ignore
import {ActivatedRoute, Router} from "@angular/router";
import {SecretaireService} from "../services/secretaire.service";
import {Secretaire} from "../model/secretaire.model";
import {ServiceService} from "../services/service.service";

@Component({
  selector: 'app-ajouter-secretaire',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './ajouter-secretaire.component.html',
  styleUrl: './ajouter-secretaire.component.css'
})
export class AjouterSecretaireComponent implements OnInit{
  serviceName!:string;
  secretaireFormGroup!:FormGroup;
  constructor(private fb:FormBuilder,private secretaireService:SecretaireService,private router:Router,private route:ActivatedRoute,private serviceService:ServiceService) {
    this.serviceName=this.route.snapshot.params['serviceName'];
  }
  ngOnInit() {


    this.secretaireFormGroup=this.fb.group({
      nom : this.fb.control(null,[Validators.required]),
      prenom : this.fb.control(null,[Validators.required]),
      email : this.fb.control(null,[Validators.required,Validators.email]),
      password : this.fb.control(null,[Validators.required]),
      serviceName : this.fb.control(this.serviceName,[Validators.required])
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
        alert("Le service que vous avez saisi contient déjà secrétaire !");
      }
    });
  }
}

