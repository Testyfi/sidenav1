import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionviewerComponent } from './questionviewer.component';

describe('QuestionviewerComponent', () => {
  let component: QuestionviewerComponent;
  let fixture: ComponentFixture<QuestionviewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionviewerComponent]
    });
    fixture = TestBed.createComponent(QuestionviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
