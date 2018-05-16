import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceBodyComponent } from './workspace-body.component';

describe('WorkspaceBodyComponent', () => {
  let component: WorkspaceBodyComponent;
  let fixture: ComponentFixture<WorkspaceBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
