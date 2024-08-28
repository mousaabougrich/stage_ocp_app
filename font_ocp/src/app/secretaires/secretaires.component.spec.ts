import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretairesComponent } from './secretaires.component';

describe('SecretairesComponent', () => {
  let component: SecretairesComponent;
  let fixture: ComponentFixture<SecretairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretairesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecretairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
