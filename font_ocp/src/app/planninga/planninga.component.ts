import { Component } from '@angular/core';
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {catchError, Observable, throwError} from "rxjs";
import {Service} from "../model/service.model";
import {ServiceService} from "../services/service.service";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {SecretaireService} from "../services/secretaire.service";

@Component({
  selector: 'app-planninga',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './planninga.component.html',
  styleUrl: './planninga.component.css'
})
export class PlanningaComponent {
  lesservices!: Observable<Array<Service>>;
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  errorMessage!: string;
  searchFormGroup!: FormGroup;
  currentAction: string = "all";

  constructor(private serviceService: ServiceService, private fb: FormBuilder,
              public authService: AuthenticationService, private router: Router,private secretaireService:SecretaireService) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });

    this.handleSearchServices();
    //this.handleGetPageServices();
  }
  handleSearchServices() {
    this.currentAction = "search";
    this.currentPage = 0; // reset to page 0 for a new search
    let keyword = this.searchFormGroup.value.keyword;
    /*this.serviceService.searchServices(keyword, this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.lesservices = data.services;
        this.totalPages = data.totalPages;
      },
      error: (err) => {
        this.errorMessage = err;
      }
    })*/
    this.lesservices=this.serviceService.searchServices(keyword).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

  goToPage(i: number) {

  }
  handleVisitPlanningAdmin(s: Service) {
    this.router.navigateByUrl("admin/pa/" + s.nom);
  }
}
