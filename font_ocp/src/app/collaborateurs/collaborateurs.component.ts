import { Component } from '@angular/core';
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {CollaborateurService} from "../services/collaborateur.service";
import {Collaborateur} from "../model/collaborateur.model";
import {catchError, map, Observable, throwError} from "rxjs";
import {Service} from "../model/service.model";

@Component({
  selector: 'app-collaborateurs',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './collaborateurs.component.html',
  styleUrl: './collaborateurs.component.css'
})
export class CollaborateursComponent {
  collaborateurs!: Observable<Array<Collaborateur>>;
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  errorMessage!: string;
  searchFormGroup!: FormGroup;
  currentAction: string = "all";
  constructor(private collaborateurService: CollaborateurService, private fb: FormBuilder,
              public authService: AuthenticationService, private router: Router) {
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
    this.collaborateurs=this.collaborateurService.searchAllCollaborateurs(keyword).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }



  handleDeleteCollaborateur(c:Collaborateur) {
    let conf = confirm("Êtes-vous sûr de vouloir supprimer ce collaborateur?");
    if (!conf) return;
    this.collaborateurService.deleteCollaborateur(c.nom,c.prenom).subscribe({
      next:(resp) => {
        this.collaborateurs=this.collaborateurs.pipe(
          map(data=>{
            let index=data.indexOf(c);
            data.slice(index,1);
            return data;
          })
        );
      },error:err => {
        console.log(err);
      }
    })
  }

  handleNewCollaborateur() {
    this.router.navigateByUrl("/admin/newCollaborateur");
  }

  handleEditCollaborateur(c: Collaborateur) {
    this.router.navigateByUrl("/admin/editCollaborateur/" + c.id_col+"/"+ c.nom+"/"+ c.prenom+"/"+ c.serviceName);
  }


  goToPage(i: number) {

  }
}
