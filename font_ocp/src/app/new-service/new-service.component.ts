import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ServiceService} from "../services/service.service";
import {NgIf} from "@angular/common";
import {Service} from "../model/service.model";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-new-service',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './new-service.component.html',
  styleUrl: './new-service.component.css'
})
export class NewServiceComponent implements OnInit{
  serviceFormGroup!:FormGroup;
  constructor(private fb:FormBuilder,private servService:ServiceService,private router:Router) {
  }
  ngOnInit() {
    this.serviceFormGroup=this.fb.group({
      nom : this.fb.control(null,[Validators.required])
    });
  }
  handleAddService() {
    let service:Service=this.serviceFormGroup.value;
    this.servService.saveService(service).subscribe({
      next:(data)=>{
        alert("Le service est ajouté avec succès !");
        this.serviceFormGroup.reset();
        this.router.navigateByUrl("/admin/lesservices");

      },error:err=>{
        alert("Ce service existe déjà !");
        console.log(err);
      }
    });
  }
}
