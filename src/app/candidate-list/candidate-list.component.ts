import { Component, OnInit } from '@angular/core';
import { CandidateService } from "../candidate.service";

import { Candidate } from "../candidate";

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit {

  constructor(private candidateService: CandidateService) { }

  private candidates: Candidate[];
  private showCreateCandidateForm: boolean = false;

  ngOnInit() {
    this.candidateService.getCandidates().subscribe(candidates => this.candidates = candidates);
  }

  onDelete(candidate: Candidate) {
    let shouldDelete = confirm('Are you sure you wish to delete this record?');

    if (shouldDelete) {
      this.candidateService.deleteCandidate(candidate).subscribe(() => {
        this.candidates = this.candidates.filter(i => i.id !== candidate.id);
      })
    }
  }
  

  onChangeOffer(event, candidate: Candidate) {
    candidate.shouldSendOffer = event.checked;

    this.candidateService.updateCandidate(candidate).subscribe();
  }

  onShowCreateCandidate() {
    this.showCreateCandidateForm = true;
  }

  onHideCreateCandidate() {
    this.showCreateCandidateForm = false;
  }

  onCreatedNewCandidate(candidate: Candidate) {
    this.candidates.push(candidate);
  }
}
