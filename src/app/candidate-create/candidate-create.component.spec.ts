import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Candidate } from '../candidate';

import { of } from 'rxjs';

import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material';

import { CandidateCreateComponent } from './candidate-create.component';

describe('CandidateCreateComponent', () => {
  let component: CandidateCreateComponent;
  let fixture: ComponentFixture<CandidateCreateComponent>;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateCreateComponent ],
      imports: [ FormsModule, MatFormFieldModule, MatCheckboxModule, MatCardModule, HttpClientModule, MatInputModule, BrowserAnimationsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make a call to service.createCandidate when onSubmit is called', () => {
    const dummyCandidate: Candidate =
      {
        id: "123",
        firstName: "John",
        lastName: "Smith",
        shouldSendOffer: true
      };

    spy = spyOn(component['candidateService'], "createCandidate").and.returnValue(of(dummyCandidate));

    component.onSubmit();

    expect(spy.calls.count()).toBe(1, 'createCandidate called once');
  });

  it('should reset candidate Wwhen service.createCandidate is called', () => {
    const dummyCandidate: Candidate =
      {
        id: "123",
        firstName: "John",
        lastName: "Smith",
        shouldSendOffer: true
      };

    spy = spyOn(component['candidateService'], "createCandidate").and.returnValue(of(dummyCandidate));

    component.onSubmit();

    expect(component['candidate'].id).toEqual("");
    expect(component['candidate'].firstName).toEqual("");
    expect(component['candidate'].lastName).toEqual("");
    expect(component['candidate'].shouldSendOffer).toEqual(false);
  });
});
