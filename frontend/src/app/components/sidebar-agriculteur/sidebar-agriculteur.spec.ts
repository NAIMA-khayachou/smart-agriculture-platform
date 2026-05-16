import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAgriculteur } from './sidebar-agriculteur';

describe('SidebarAgriculteur', () => {
  let component: SidebarAgriculteur;
  let fixture: ComponentFixture<SidebarAgriculteur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarAgriculteur],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarAgriculteur);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
