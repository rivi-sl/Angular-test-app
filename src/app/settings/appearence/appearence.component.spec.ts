import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppearenceComponent } from './appearence.component';

describe('AppearenceComponent', () => {
  let component: AppearenceComponent;
  let fixture: ComponentFixture<AppearenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppearenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppearenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
