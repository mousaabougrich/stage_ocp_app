import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CollaborateurService} from "../services/collaborateur.service";
import {Collaborateur} from "../model/collaborateur.model";

@Component({
  selector: 'app-edit-collaborateur',
  standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './edit-collaborateur.component.html',
  styleUrl: './edit-collaborateur.component.css'
})
export class EditCollaborateurComponent implements OnInit{
  n!:string;
  p!:string;
  i!:number;
  c!:Collaborateur;
  s!:string;
  collaborateurFormGroup!:FormGroup;
  constructor(private route:ActivatedRoute,public collaborateurService:CollaborateurService, private fb:FormBuilder,private router:Router) {
    this.i=this.route.snapshot.params['id_col'];
    this.n=this.route.snapshot.params['nom'];
    this.p=this.route.snapshot.params['prenom'];
    this.s=this.route.snapshot.params['serviceName'];


  }
  ngOnInit() {
    this.collaborateurFormGroup=this.fb.group({
      id_col : this.fb.control(this.i,[Validators.required]),
      nom : this.fb.control(this.n,[Validators.required]),
      prenom : this.fb.control(this.p,[Validators.required]),
      serviceName : this.fb.control(this.s,[Validators.required])
    });
  }

  handleUpdateCollaborateur() {
    let c:Collaborateur=this.collaborateurFormGroup.value;
    this.collaborateurService.updateCollaborateur(this.n,this.p,this.s,c).subscribe({
      next:(data)=>{
        alert("Le collaborateur est modifié avec succès !");
        this.collaborateurFormGroup.reset();
        this.router.navigateByUrl("/admin/collaborateurs");
      },error:err=> {
        alert("Le nom complet du collaborateur que vous avez saisi existe correspond à un autre collaborateur dans ce service!");
      }
    })
  }
}


