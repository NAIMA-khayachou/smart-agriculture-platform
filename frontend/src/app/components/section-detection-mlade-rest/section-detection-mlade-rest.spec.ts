import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDetectionMladeRest } from './section-detection-mlade-rest';

describe('SectionDetectionMladeRest', () => {
  let component: SectionDetectionMladeRest;
  let fixture: ComponentFixture<SectionDetectionMladeRest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionDetectionMladeRest],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionDetectionMladeRest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
