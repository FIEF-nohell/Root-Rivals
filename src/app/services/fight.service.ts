import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { NewPlantPage } from '../modals/new-plant/new-plant.page';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FightService {

  constructor(private afAuth: AngularFireAuth, private auth: AuthService, private db: AngularFirestore) { }

  opponents: any = []
  public opponent$ = new BehaviorSubject<any>({});
  opponent: any

  getRandomItem<T>(items: T[]): T | undefined {
  if (items.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

  getOpponentObservable(): Observable<any | null> {
    return new Observable<any | null>((observer: { next: (arg0: null) => void; complete: () => void; }) => {
      this.afAuth.user.subscribe(async user => {
        if (user) {
          await this.db.collection('plants').ref.where("uid", "!=", user?.uid).get().then((data: any) => {
            data.forEach(async (mathias: any) => {
              if(mathias.data().attackable == true && mathias.data().health > 0) this.opponents.push(mathias.data())
            });
            this.opponent = this.getRandomItem(this.opponents)
            observer.next(this.opponent);
            observer.complete();
          });
        } else {
          observer.next(null);
          observer.complete();
        }
      });
    });
  }
}
