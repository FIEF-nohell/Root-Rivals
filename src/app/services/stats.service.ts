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
export class StatsService {

  constructor(private modalController: ModalController, private afAuth: AngularFireAuth, private auth: AuthService, private db: AngularFirestore, private alertController: AlertController) { }

  async loadScoreboard() {
    let allPlants = this.db.collection('plants').ref.orderBy("plantScore", "desc").get().then((data: any) => {
        data.forEach((element: any) => {
          console.log(element.data())  
        });
      });
  }

}