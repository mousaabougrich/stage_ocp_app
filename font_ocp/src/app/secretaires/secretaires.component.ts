import { Component } from '@angular/core';
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {catchError, map, Observable, throwError} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {SecretaireService} from "../services/secretaire.service";
import {Secretaire} from "../model/secretaire.model";
import {Collaborateur} from "../model/collaborateur.model";
import {Service} from "../model/service.model";

@Component({
  selector: 'app-secretaires',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './secretaires.component.html',
  styleUrl: './secretaires.component.css'
})
export class SecretairesComponent {
  secretaires!: Observable<Array<Secretaire>>;
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  errorMessage!: string;
  searchFormGroup!: FormGroup;
  currentAction: string = "all";
  constructor(private secretaireService: SecretaireService, private fb: FormBuilder,
              public authService: AuthenticationService, private router: Router) {
  }
  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });

    this.handleSearchSecretaires();

  }
  handleSearchSecretaires() {
    this.currentAction = "search";
    this.currentPage = 0; // reset to page 0 for a new search
    let keyword = this.searchFormGroup.value.keyword;
    this.secretaires=this.secretaireService.searchSecretaires(keyword).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }



  handleDeleteSecretaire(c:Secretaire) {
    let conf = confirm("Êtes-vous sûr de vouloir supprimer ce secrétaire?");
    if (!conf) return;
    this.secretaireService.deleteSecretaire(c.nom,c.prenom,c.email).subscribe({
      next:(resp) => {
        this.secretaires=this.secretaires.pipe(
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

  handleNewSecretaire() {
    this.router.navigateByUrl("/admin/newSecretaire");
  }

  handleEditSecretaire(s: Secretaire) {
    this.router.navigateByUrl("/admin/editSecretaire/" + s.nom+"/"+ s.prenom+"/"+ s.email+"/"+ s.password+"/"+s.serviceName);
  }


  goToPage(i: number) {

  }
}
