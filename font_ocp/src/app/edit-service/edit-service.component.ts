import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ServiceService} from "../services/service.service";
import {Service} from "../model/service.model";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-edit-service',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.css'
})
export class EditServiceComponent implements OnInit{
  serviceId!:number;
  service!:Service;
  serviceName!:string;
  serviceFormGroup!:FormGroup;
  constructor(private route:ActivatedRoute,public serviceService:ServiceService, private fb:FormBuilder,private router:Router) {
    this.serviceId=this.route.snapshot.params['id_s'];
    this.serviceName=this.route.snapshot.params['nom'];


  }
  ngOnInit() {
    this.serviceFormGroup=this.fb.group({
      id_s : this.fb.control(this.serviceId,[Validators.required]),
      nom : this.fb.control(this.serviceName,[Validators.required]),
    });
  }

  handleUpdateService() {
    let s:Service=this.serviceFormGroup.value;
    this.serviceService.updateService(this.serviceName,s).subscribe({
      next:(data)=>{
        alert("Le service est modifié avec succès !");
        this.serviceFormGroup.reset();
        this.router.navigateByUrl("/admin/lesservices");
      },error:err=> {
        alert("Le nom du service que vous avez saisi existe correspond à un autre service!");
      }
    })
  }
}
