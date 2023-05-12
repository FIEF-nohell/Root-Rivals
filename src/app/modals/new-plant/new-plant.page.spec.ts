import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewPlantPage } from './new-plant.page';

describe('NewPlantPage', () => {
  let component: NewPlantPage;
  let fixture: ComponentFixture<NewPlantPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewPlantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
