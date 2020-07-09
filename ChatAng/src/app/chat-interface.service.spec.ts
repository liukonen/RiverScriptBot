import { TestBed } from '@angular/core/testing';

import { ChatInterfaceService } from './chat-interface.service';

describe('ChatInterfaceService', () => {
  let service: ChatInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
