import { TestBed } from '@angular/core/testing';

import { TesttypeService } from './testtype.service';

describe('TesttypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TesttypeService = TestBed.get(TesttypeService);
    expect(service).toBeTruthy();
  });
});
