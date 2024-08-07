import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasttestComponent } from './pasttest.component';

describe('PasttestComponent', () => {
  let component: PasttestComponent;
  let fixture: ComponentFixture<PasttestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasttestComponent]
    });
    fixture = TestBed.createComponent(PasttestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
