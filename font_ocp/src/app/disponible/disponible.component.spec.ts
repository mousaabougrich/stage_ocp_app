import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibleComponent } from './disponible.component';

describe('DisponibleComponent', () => {
  let component: DisponibleComponent;
  let fixture: ComponentFixture<DisponibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisponibleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisponibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
