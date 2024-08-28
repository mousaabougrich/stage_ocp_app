import {Component, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {catchError, map, Observable, throwError} from "rxjs";
import {Collaborateur} from "../model/collaborateur.model";
import {CollaborateurService} from "../services/collaborateur.service";
import {AuthenticationService} from "../services/authentication.service";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {DateService} from "../date.service";

@Component({
  selector: 'app-p',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    NgClass,
    DatePipe,
    RouterOutlet
  ],
  templateUrl: './p.component.html',
  styleUrl: './p.component.css'
})
export class PComponent implements OnInit{
  collaborateurs!: Observable<Collaborateur>;
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  errorMessage!: string;
  searchFormGroup!: FormGroup;
  currentAction: string = "all";
  saturday!: Date ;
  sunday!: Date;
  serviceName!:string;
  constructor(private collaborateurService: CollaborateurService, private fb: FormBuilder,
              public authService: AuthenticationService, private router: Router,private dateService: DateService,private route:ActivatedRoute) {
    this.serviceName=this.route.snapshot.params['nom'];
  }

  ngOnInit(): void {
    const dates = this.dateService.getSaturdayAndSundayDates();
    this.saturday = dates.saturday;
    this.sunday = dates.sunday;
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });

    this.handleSearchCollaborateurs();

  }
  handleSearchCollaborateurs() {
    this.currentAction = "search";
    this.currentPage = 0; // reset to page 0 for a new search
    let keyword = this.searchFormGroup.value.keyword;
    this.collaborateurs=this.collaborateurService.getCurrentAstreinte(this.serviceName).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }



  handleDeleteCollaborateur() {
    this.router.navigateByUrl("/disponible/"+this.serviceName);

  }

  handleNewCollaborateur() {
    this.router.navigateByUrl("/admin/newCollaborateur");
  }

  handleEditCollaborateur(c: Collaborateur) {
    this.router.navigateByUrl("/admin/editCollaborateur/" + c.id_col+"/"+ c.nom+"/"+ c.prenom+"/"+ c.serviceName);
  }


  goToPage(i: number) {

  }

  handleGenerateP() {
    this.collaborateurService.getAstreinte(this.serviceName).subscribe({
      next:(data)=>{
        alert("Le planning de cette semaine est généré avec succès !");
        window.location.reload();
      },error:err=> {
        alert("Le nom du service que vous avez saisi existe correspond à un autre service!");
        }
    })
  }

}
