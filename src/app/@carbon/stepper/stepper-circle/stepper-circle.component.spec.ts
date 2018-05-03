import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperCircleComponent } from './stepper-circle.component';

describe('StepperCircleComponent', () => {
  let component: StepperCircleComponent;
  let fixture: ComponentFixture<StepperCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepperCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
