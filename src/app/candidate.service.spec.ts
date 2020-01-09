import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { CandidateService } from './candidate.service';
import { Candidate } from '../app/candidate';

describe('CandidateService', () => {
  let httpMock: HttpTestingController;
  let service: CandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.get(CandidateService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to retrieve candidates from API GET', () => {
      const dummyCandidates: Candidate[] = [
        {
          id: "123",
          firstName: "John",
          lastName: "Smith",
          shouldSendOffer: true
        },

        {
          id: "1234",
          firstName: "James",
          lastName: "Davis",
          shouldSendOffer: false
        }
      ];

      service.getCandidates().subscribe(candidates => {
          expect(candidates.length).toBe(2);
          expect(candidates).toEqual(dummyCandidates);
      });

      const request = httpMock.expectOne( `${service.apiUrl}`);
      expect(request.request.method).toBe('GET');
      request.flush(dummyCandidates);
  });

  it('should be able to update a candidate from API PUT', () => {
      const dummyCandidate: Candidate = 
        {
          id: "123",
          firstName: "John",
          lastName: "Smith",
          shouldSendOffer: true
      };

      service.updateCandidate(dummyCandidate).subscribe(candidate => {
        expect(candidate).toEqual(dummyCandidate);
      });

      const request = httpMock.expectOne( `${service.apiUrl}/${dummyCandidate.id}`);
      expect(request.request.method).toBe('PUT');
      request.flush(dummyCandidate);
  });

  it('should be able to delete candidate from API DELETE', () => {
    const dummyCandidate: Candidate = 
      {
        id: "123",
        firstName: "John",
        lastName: "Smith",
        shouldSendOffer: true
    };

    service.deleteCandidate(dummyCandidate).subscribe(candidate => {
      expect(candidate).toEqual(dummyCandidate);
    });

    const request = httpMock.expectOne( `${service.apiUrl}/${dummyCandidate.id}`);
    expect(request.request.method).toBe('DELETE');
    request.flush(dummyCandidate);
});
});
