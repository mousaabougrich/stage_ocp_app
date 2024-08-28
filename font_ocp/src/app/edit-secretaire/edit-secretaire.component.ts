import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Secretaire} from "../model/secretaire.model";
import {SecretaireService} from "../services/secretaire.service";

@Component({
  selector: 'app-edit-secretaire',
  standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './edit-secretaire.component.html',
  styleUrl: './edit-secretaire.component.css'
})
export class EditSecretaireComponent {
  n!:string;
  pass!:string;
  e!:string;
  p!:string;
  s!:string;
  secretaireFormGroup!:FormGroup;
  constructor(private route:ActivatedRoute,public secretaireService:SecretaireService, private fb:FormBuilder,private router:Router) {
    this.e=this.route.snapshot.params['email'];
    this.pass=this.route.snapshot.params['password'];
    this.n=this.route.snapshot.params['nom'];
    this.p=this.route.snapshot.params['prenom'];
    this.s=this.route.snapshot.params['serviceName'];


  }
  ngOnInit() {
    this.secretaireFormGroup=this.fb.group({
      password : this.fb.control(this.pass,[Validators.required]),
      email: this.fb.control(this.e,[Validators.required]),
      nom : this.fb.control(this.n,[Validators.required]),
      prenom : this.fb.control(this.p,[Validators.required]),
      serviceName : this.fb.control(this.s,[Validators.required])
    });
  }

  handleUpdateSecretaire() {
    let sec:Secretaire=this.secretaireFormGroup.value;
    this.secretaireService.updateSecretaire(this.n,this.p,this.e,sec,this.s).subscribe({
      next:(data)=>{
        alert("Secrétaire est modifié avec succès !");
        this.secretaireFormGroup.reset();
        this.router.navigateByUrl("/admin/secretaires");
      },error:err=> {
        alert("Cet email existe déjà!");
      }
    })
  }
}
