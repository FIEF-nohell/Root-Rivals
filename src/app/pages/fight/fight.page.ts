import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { FightService } from 'src/app/services/fight.service';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.page.html',
  styleUrls: ['./fight.page.scss'],
})
export class FightPage implements OnInit, ViewWillEnter {

  in_fight: boolean = false;
  results: boolean = false;
  win: boolean = false;

  constructor(private fightService: FightService, private plantService: PlantService, private router: Router) { } 

  opponent: any = [];
  plant: any = [];
  enemy_damage = 0;
  self_damage = 0;
  setXP = 50;

  ionViewWillEnter() {
    let plantTemp: any
    this.plantService.getUserPlantObservable().subscribe((plant) => { // Check if can be watered
      if (plant && plant.canBeWatered !== undefined) {
        plantTemp = plant;  

        let updatedPlantLel = { 
          ...this.plant,
          health: plantTemp.health 
        };

        this.plant = updatedPlantLel
      }
    });
  }
  
  ngOnInit() {
    this.plantService.getUserPlantObservable().subscribe((plant) => {
      this.plant = plant;
    })
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
            this.enemy_damage = (this.plant.damage + (this.plant.level * ((this.plant.damage / 100) * 3))).toFixed(1);
            this.self_damage = (this.opponent.damage + (this.opponent.level * ((this.opponent.damage / 100) * 3))).toFixed(1);
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
      await this.delay(500)
      if (x % 2 == 0) {
        this.attackPlant(this.opponent, this.plant)
      }
      else {
        this.attackPlant(this.plant, this.opponent)
      }
      if (this.plant.health <= 0) {
        this.plant.health = 0

        let xp = this.plant.experience + this.setXP/2
        let lvl = this.plant.level
        let losses = this.plant.losses
        if (xp >= 100){
          xp = xp - 100
          lvl = lvl + 1
        }
        let obj = {
          "experience": xp,
          "level": lvl,
          "losses": losses + 1,
          "health": 0,
        }
        console.log("opp id: " + this.opponent.uid)
        console.log("plant id: " + this.plant.uid)
        this.plantService.updateUserByUID(this.plant.uid, obj)

        xp = this.opponent.experience + this.setXP/2
        lvl = this.opponent.level
        let wins = this.opponent.wins
        if (xp >= 100){
          xp = xp - 100
          lvl = lvl + 1
        }
        let newobj = {
          "experience": xp,
          "level": lvl,
          "wins": wins + 1,
          "health": 100,
          "attackable": false
        }
        this.plantService.updateUserByUID(this.opponent.uid, newobj)

        await this.delay(500)
        this.in_fight = false;
        this.win = false;
        this.results = true;
        break;
      }
      else if (this.opponent.health <= 0) {
        this.opponent.health = 0
        
        let xp = this.opponent.experience + (this.setXP/2)/2
        let lvl = this.opponent.level
        let losses = this.opponent.losses
        if (xp >= 100){
          xp = xp - 100
          lvl = lvl + 1
        }
        let obj = {
          "experience": xp,
          "level": lvl,
          "losses": losses + 1,
        }
        this.plantService.updateUserByUID(this.opponent.uid, obj)

        xp = this.plant.experience + this.setXP/2
        lvl = this.plant.level
        let wins = this.plant.wins
        if (xp >= 100){
          xp = xp - 100
          lvl = lvl + 1
        }
        let newobj = {
          "experience": xp,
          "level": lvl,
          "wins": wins + 1,
          "health": this.plant.health,
          "attackable": false
        }
        this.plantService.updateUserByUID(this.plant.uid, newobj)

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
      defender.health -= (attacker.damage + (attacker.level * ((attacker.damage / 100) * 3))).toFixed(1)
      this.fadeInOutBadge(defender.dmgBadge!, 1.5); 
    } else {
      this.fadeInOutBadge(defender.blkBadge!, 1.5);
    }
  }

  reset_combat() {
    this.results = false;
    this.router.navigate(["/tabs/plant"])
  }
 
}
