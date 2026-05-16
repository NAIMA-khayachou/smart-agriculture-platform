import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueNousSommeNous } from './que-nous-somme-nous';

describe('QueNousSommeNous', () => {
  let component: QueNousSommeNous;
  let fixture: ComponentFixture<QueNousSommeNous>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueNousSommeNous],
    }).compileComponents();

    fixture = TestBed.createComponent(QueNousSommeNous);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
