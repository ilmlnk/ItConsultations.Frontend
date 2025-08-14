import { TestBed } from '@angular/core/testing';

import { ToasterNotificationsService } from './toaster-notifications.service';

describe('NotificationsServiceService', () => {
  let service: ToasterNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToasterNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
