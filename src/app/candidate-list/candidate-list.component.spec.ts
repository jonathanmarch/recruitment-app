import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { of } from 'rxjs';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';

import { CandidateListComponent } from './candidate-list.component';
import { CandidateCreateComponent } from '../candidate-create/candidate-create.component';
import { Candidate } from '../candidate';

describe('CandidateListComponent', () => {
  let component: CandidateListComponent;
  let fixture: ComponentFixture<CandidateListComponent>;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateListComponent, CandidateCreateComponent ],
      imports: [ FormsModule, MatCheckboxModule, MatButtonModule, MatCardModule, MatFormFieldModule, HttpClientModule, MatInputModule, BrowserAnimationsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make a call to service.getCandidates when ngOnInit is called', () => {
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

    spy = spyOn(component['candidateService'], "getCandidates").and.returnValue(of(dummyCandidates));

    component.ngOnInit();

    expect(spy.calls.count()).toBe(1, 'getCandidates called once');
  });

  it('should set shouldSendOffer to true when onChangeOffer is called', () => {
    let dummyCandidate: Candidate = {
      id: "123",
      firstName: "John",
      lastName: "Smith",
      shouldSendOffer: false
    };

    spy = spyOn(component['candidateService'], "updateCandidate").and.returnValue(of({ test: true }));

    component.onChangeOffer({ checked: true }, dummyCandidate);

    expect(dummyCandidate.shouldSendOffer).toBe(true);
    expect(spy.calls.count()).toBe(1, 'updateCandidate called once');
  });

  it('should set showCreateCandidateForm to true when onShowCreateCandidate is called', () => {
    component.onShowCreateCandidate();

    expect(component['showCreateCandidateForm']).toBe(true);
  });

  it('should render candidate-create component when onShowCreateCandidate is called', () => {
    component.onShowCreateCandidate();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.candidate-create')).nativeElement).toBeTruthy();
  });
});
