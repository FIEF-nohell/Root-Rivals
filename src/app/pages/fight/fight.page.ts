import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FightService } from 'src/app/services/fight.service';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.page.html',
  styleUrls: ['./fight.page.scss'],
})
export class FightPage implements OnInit {

  in_fight: boolean = false;
  results: boolean = false;
  win: boolean = false;

  constructor(private fightService: FightService, private plantService: PlantService) { } 

  opponent: any = [];
  plant: any = [];
  enemy_damage = 0;
  self_damage = 0;
  setXP = 50;
  
  ngOnInit() {

    //this.fadeInOutBadge(document.getElementById('block_self')!, 1.5); //Example Visualizing attack
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
  
  search_enemy() {
    //Call Combat Service and search enemy
    this.fightService.getOpponentObservable().subscribe((opponent) => {
        this.plantService.getUserPlantObservable().subscribe((plant) => { // Check if can be watered
          if (plant !== undefined) {
            this.opponent = opponent;
            this.plant = plant;
            this.enemy_damage = this.opponent.damage;
            this.self_damage = this.plant.damage;
            console.log(this.opponent)
            console.log(this.plant)
            this.start_fight()
        }
      });
    })
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async start_fight() {
    
    this.in_fight = true;
    await this.delay(2000)
 
    this.opponent.dmgBadge = document.getElementById('damage_enemy'); 
    this.opponent.blkBadge = document.getElementById('block_enemy'); 
    this.plant.dmgBadge = document.getElementById('damage_self'); 
    this.plant.blkBadge = document.getElementById('block_self'); 

    console.log(this.plant, this.opponent)

    for (let x = 0; x < x+1; x++) {
      await this.delay(800)
      if (x % 2 == 0) {
        this.attackPlant(this.opponent, this.plant)
      }
      else {
        this.attackPlant(this.plant, this.opponent)
      }
      if (this.plant.health <= 0) {
        this.plant.health = 0
        this.setXP = this.setXP/2
        await this.delay(500)
        this.in_fight = false;
        this.win = false;
        this.results = true;
        break;
      }
      else if (this.opponent.health <= 0) {
        this.opponent.health = 0
        await this.delay(500)
        this.in_fight = false;
        this.win = true;
        this.results = true;
        break;
      }
    }
  }

  async attackPlant(attacker: any, defender: any) {
    let num = Math.floor(Math.random() * 101)
    let block = false
    switch (defender.defense) {
      case 8:
        if (num < 35) block = true
        break
      case 5:
        if (num < 25) block = true
        break
      case 3:
        if (num < 15) block = true
        break
    }
    if (block == false) {
      defender.health -= attacker.damage 
      this.fadeInOutBadge(defender.dmgBadge!, 1.5); 
    } else {
      this.fadeInOutBadge(defender.blkBadge!, 1.5);
    }
  }

  reset_combat() {
    //UPDATE KD
    this.results = false;
  }
 
}
