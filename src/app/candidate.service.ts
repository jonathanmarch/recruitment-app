import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Candidate } from "./candidate";

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  public apiUrl = "https://localhost:44308/api/Recruitment";

  constructor(private http: HttpClient) { }

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.apiUrl);
  }

  createCandidate(candidate: Candidate) {
    return this.http.post(`${this.apiUrl}`, candidate);
  }

  updateCandidate(candidate: Candidate) {
    return this.http.put(`${this.apiUrl}/${candidate.id}`, candidate);
  }

  deleteCandidate(candidate: Candidate) {
    return this.http.delete(`${this.apiUrl}/${candidate.id}`);
  }
}
