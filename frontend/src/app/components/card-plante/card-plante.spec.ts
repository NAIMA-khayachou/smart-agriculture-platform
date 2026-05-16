import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPlante } from './card-plante';

describe('CardPlante', () => {
  let component: CardPlante;
  let fixture: ComponentFixture<CardPlante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPlante],
    }).compileComponents();

    fixture = TestBed.createComponent(CardPlante);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
