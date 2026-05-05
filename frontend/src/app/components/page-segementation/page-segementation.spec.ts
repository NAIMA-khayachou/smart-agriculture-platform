import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSegementation } from './page-segementation';

describe('PageSegementation', () => {
  let component: PageSegementation;
  let fixture: ComponentFixture<PageSegementation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSegementation],
    }).compileComponents();

    fixture = TestBed.createComponent(PageSegementation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
