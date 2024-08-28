import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterSecretaireComponent } from './ajouter-secretaire.component';

describe('AjouterSecretaireComponent', () => {
  let component: AjouterSecretaireComponent;
  let fixture: ComponentFixture<AjouterSecretaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterSecretaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterSecretaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
