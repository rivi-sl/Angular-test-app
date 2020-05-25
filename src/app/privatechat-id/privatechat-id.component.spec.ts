import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatechatIDComponent } from './privatechat-id.component';

describe('PrivatechatIDComponent', () => {
  let component: PrivatechatIDComponent;
  let fixture: ComponentFixture<PrivatechatIDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivatechatIDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatechatIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
