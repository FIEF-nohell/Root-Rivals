import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.page.html',
  styleUrls: ['./fight.page.scss'],
})
export class FightPage implements OnInit {

  in_fight: boolean = false;
  results: boolean = false;

  constructor() { } 

  enemy_damage = 0;
  self_damage = 0;

  ngOnInit() {
    const enemy_damage_badge = document.getElementById('damage_enemy'); 
    const self_damage_badge = document.getElementById('damage_self'); 
    
    const enemy_block_badge = document.getElementById('block_enemy'); 
    const self_block_badge = document.getElementById('block_self'); 
    
    /* this.fadeInOutBadge(enemy_damage_badge!, 1.5); */ //Example Visualizing attack
  }

  async fadeInOutBadge(badge: HTMLElement, duration: number) {
    badge.style.opacity = '0';
    badge.style.transition = `opacity ${duration / 2}s ease-in-out`;
    setTimeout(() => {
      badge.style.opacity = '1';
    }, 0);
    setTimeout(() => {
      badge.style.opacity = '0';
    }, duration / 2 * 1000);
  }

  search_enemy(){
    //Call Combat Service and search enemy
    this.start_fight()
  }

  start_fight(){
    this.in_fight = true;
  }

  reset_combat(){
    this.results = false;
  }
 
}
