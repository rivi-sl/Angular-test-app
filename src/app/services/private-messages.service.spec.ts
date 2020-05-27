import { TestBed } from '@angular/core/testing';

import { PrivateMessagesService } from './private-messages.service';

describe('PrivateMessagesService', () => {
  let service: PrivateMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivateMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
