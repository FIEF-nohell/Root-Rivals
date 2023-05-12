import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantPage } from './plant.page';

describe('PlantPage', () => {
  let component: PlantPage;
  let fixture: ComponentFixture<PlantPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PlantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
