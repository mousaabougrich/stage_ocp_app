import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningaComponent } from './planninga.component';

describe('PlanningaComponent', () => {
  let component: PlanningaComponent;
  let fixture: ComponentFixture<PlanningaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanningaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
