import { TestBed } from '@angular/core/testing';

import { DprtService } from './dprt.service';

describe('DprtService', () => {
  let service: DprtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DprtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
