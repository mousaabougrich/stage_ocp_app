import { Component } from '@angular/core';
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {catchError, map, Observable, throwError} from "rxjs";
import {Collaborateur} from "../model/collaborateur.model";
import {CollaborateurService} from "../services/collaborateur.service";
import {AuthenticationService} from "../services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-disponible',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './disponible.component.html',
  styleUrl: './disponible.component.css'
})
export class DisponibleComponent {
  collaborateurs!: Observable<Array<Collaborateur>>;
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  errorMessage!: string;
  searchFormGroup!: FormGroup;
  currentAction: string = "all";
  serviceName!:string;
  constructor(private collaborateurService: CollaborateurService, private fb: FormBuilder,
              public authService: AuthenticationService, private router: Router,private route:ActivatedRoute) {
    this.serviceName=this.route.snapshot.params['nom'];
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });

    this.handleSearchCollaborateurs();

  }
  handleSearchCollaborateurs() {
    this.currentAction = "search";
    this.currentPage = 0; // reset to page 0 for a new search
    let keyword = this.searchFormGroup.value.keyword;
    this.collaborateurs=this.collaborateurService.getCollaborateursByservice(this.serviceName).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }



  handleRemplacerCollaborateur(c:Collaborateur) {
    let conf = confirm("Êtes-vous sûr de vouloir choisir ce collaborateur?");
    if (!conf) return;
    this.collaborateurService.updateCurrent(this.serviceName,c.id_col).subscribe({
      next:(d)=>{
        alert("Le collaborateur que vous avez choisi est disponible");

          this.collaborateurService.getAstreinte(this.serviceName).subscribe({
            next:(data)=>{
            },error:err=> {
              alert("Le nom du service que vous avez saisi existe correspond à un autre service!");
            }
          })

        this.router.navigateByUrl("/p/"+this.serviceName);
      },error:err => {
        alert("a");
      }
    })
  }
  goToPage(i: number) {

  }
}
