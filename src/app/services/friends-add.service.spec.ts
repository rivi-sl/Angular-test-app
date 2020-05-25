import { TestBed } from '@angular/core/testing';

import { FriendsAddService } from './friends-add.service';

describe('FriendsAddService', () => {
  let service: FriendsAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendsAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
