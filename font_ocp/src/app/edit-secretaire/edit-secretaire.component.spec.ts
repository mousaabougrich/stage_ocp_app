import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSecretaireComponent } from './edit-secretaire.component';

describe('EditSecretaireComponent', () => {
  let component: EditSecretaireComponent;
  let fixture: ComponentFixture<EditSecretaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSecretaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSecretaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
