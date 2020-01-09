import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Candidate } from "../candidate";
import { CandidateService } from "../candidate.service";

@Component({
  selector: "app-candidate-create",
  templateUrl: "./candidate-create.component.html",
  styleUrls: ["./candidate-create.component.scss"]
})
export class CandidateCreateComponent implements OnInit {
  private candidate: Candidate = {
    id: "",
    firstName: "",
    lastName: "",
    shouldSendOffer: false
  };

  constructor(private candidateService: CandidateService) {}

  @Output() hideCreateCandidateForm = new EventEmitter<void>();
  @Output() createdNewCandidate = new EventEmitter<Candidate>();

  ngOnInit() {
    delete this.candidate.id; // don't send id since we generate a new GUID on backend
  }

  onSubmit() {
    this.candidateService.createCandidate(this.candidate).subscribe(
      res => {
        let createdCandidate = <Candidate> res;
        this.createdNewCandidate.emit(createdCandidate);
        this.hideCreateCandidateForm.emit();

        // reset
        this.candidate = {
          id: "",
          firstName: "",
          lastName: "",
          shouldSendOffer: false
        };

      },
      err => {
        alert("An error occured while trying to create the candidate.");
      }
    );
  }

  onCancel(event) {
    event.preventDefault();
    this.hideCreateCandidateForm.emit();
  }
}
