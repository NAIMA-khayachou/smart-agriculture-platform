import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumeGlobalComponent } from './resume-global';

describe('ResumeGlobalComponent', () => {
  let component: ResumeGlobalComponent;
  let fixture: ComponentFixture<ResumeGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeGlobalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});