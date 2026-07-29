import { TestBed } from '@angular/core/testing';

import { NotificationMailService } from './notification-mail.service';

describe('NotificationMailService', () => {
  let service: NotificationMailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationMailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
