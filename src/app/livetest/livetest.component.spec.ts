import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivetestComponent } from './livetest.component';

describe('LivetestComponent', () => {
  let component: LivetestComponent;
  let fixture: ComponentFixture<LivetestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LivetestComponent]
    });
    fixture = TestBed.createComponent(LivetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
