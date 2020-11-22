import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { PublicationService } from './publication.service';

describe('PublicationService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }),
  );

  it('should be created', () => {
    const service: PublicationService = TestBed.inject(PublicationService);
    expect(service).toBeTruthy();
  });
});
