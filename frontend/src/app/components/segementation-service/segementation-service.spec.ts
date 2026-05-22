import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegementationService } from './segementation-service';

describe('SegementationService', () => {
  let component: SegementationService;
  let fixture: ComponentFixture<SegementationService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegementationService],
    }).compileComponents();

    fixture = TestBed.createComponent(SegementationService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
