import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeGlobal } from './resume-global';

describe('ResumeGlobal', () => {
  let component: ResumeGlobal;
  let fixture: ComponentFixture<ResumeGlobal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeGlobal],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeGlobal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
