import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalchatComponent } from './globalchat.component';

describe('GlobalchatComponent', () => {
  let component: GlobalchatComponent;
  let fixture: ComponentFixture<GlobalchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
