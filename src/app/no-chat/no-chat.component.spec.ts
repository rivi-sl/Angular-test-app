import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoChatComponent } from './no-chat.component';

describe('NoChatComponent', () => {
  let component: NoChatComponent;
  let fixture: ComponentFixture<NoChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
