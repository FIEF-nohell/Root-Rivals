import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FightPage } from './fight.page';

describe('FightPage', () => {
  let component: FightPage;
  let fixture: ComponentFixture<FightPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
