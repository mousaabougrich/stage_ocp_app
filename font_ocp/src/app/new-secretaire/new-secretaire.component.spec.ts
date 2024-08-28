import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSecretaireComponent } from './new-secretaire.component';

describe('NewSecretaireComponent', () => {
  let component: NewSecretaireComponent;
  let fixture: ComponentFixture<NewSecretaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSecretaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSecretaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
