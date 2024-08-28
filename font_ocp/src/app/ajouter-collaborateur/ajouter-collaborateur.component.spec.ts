import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterCollaborateurComponent } from './ajouter-collaborateur.component';

describe('AjouterCollaborateurComponent', () => {
  let component: AjouterCollaborateurComponent;
  let fixture: ComponentFixture<AjouterCollaborateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterCollaborateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterCollaborateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
