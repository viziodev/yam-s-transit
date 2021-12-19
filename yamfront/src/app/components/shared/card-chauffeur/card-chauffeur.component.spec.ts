import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardChauffeurComponent } from './card-chauffeur.component';

describe('CardChauffeurComponent', () => {
  let component: CardChauffeurComponent;
  let fixture: ComponentFixture<CardChauffeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardChauffeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardChauffeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
