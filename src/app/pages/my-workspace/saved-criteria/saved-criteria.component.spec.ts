import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCriteriaComponent } from './saved-criteria.component';

describe('SavedCriteriaComponent', () => {
  let component: SavedCriteriaComponent;
  let fixture: ComponentFixture<SavedCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
