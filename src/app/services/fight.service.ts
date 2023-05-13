import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { NewPlantPage } from '../modals/new-plant/new-plant.page';

@Injectable({
  providedIn: 'root'
})
export class FightService {

  constructor(private afAuth: AngularFireAuth, private auth: AuthService, private db: AngularFirestore) { }

  opponents: any = []
  opponent: any

  getRandomItem<T>(items: T[]): T | undefined {
  if (items.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

  async getRandomOpponent() {
    try {
      this.opponents = []
      await this.afAuth.user.subscribe(async user => {
        if (user) {
          await this.db.collection('plants').ref.where("uid", "!=", user?.uid).get().then((data: any) => {
            data.forEach(async (raul: any) => {
              if(raul.data().attackable == true) this.opponents.push(raul.data())
            });
          });
          this.opponent = this.getRandomItem(this.opponents);
          console.log(this.opponent)
        }
      });
    } catch (error) {
      console.error('Error while updating plant:', error)
    }
  }
}
