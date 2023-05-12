import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoreboardPage } from './scoreboard.page';

describe('ScoreboardPage', () => {
  let component: ScoreboardPage;
  let fixture: ComponentFixture<ScoreboardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ScoreboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
