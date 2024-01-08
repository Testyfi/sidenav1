import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcreatedtestComponent } from './allcreatedtest.component';

describe('AllcreatedtestComponent', () => {
  let component: AllcreatedtestComponent;
  let fixture: ComponentFixture<AllcreatedtestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllcreatedtestComponent]
    });
    fixture = TestBed.createComponent(AllcreatedtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
