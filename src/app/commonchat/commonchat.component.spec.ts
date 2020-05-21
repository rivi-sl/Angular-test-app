import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonchatComponent } from './commonchat.component';

describe('CommonchatComponent', () => {
  let component: CommonchatComponent;
  let fixture: ComponentFixture<CommonchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
