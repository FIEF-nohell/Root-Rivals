import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

interface Plant {
  name: string;
  owner: string;
  water: number;
  born: number;
  lastWatered: number;
  lastDrought: number | null;
  defense: number;
  damage: number;
  experience: number;
  wins: number;
  losses: number;
  health: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private alertController: AlertController) { }

  async createPlant() {
    try {
      const user = await this.afAuth.currentUser;

      const newPlant: Plant = {
        name: user!.displayName! + "'s Plant",
        owner: user!.displayName!,
        water: 100,
        lastWatered: Date.now(),
        born: Date.now(),
        lastDrought: null,
        defense: 2,
        damage: 10,
        experience: 0,
        wins: 0,
        losses: 0,
        health: 100,
      };

      // Add the new plant to the Firestore collection
      const plantRef: DocumentReference<Plant> = await this.db.collection<Plant>('plants').add(newPlant);

      // Assign the plant to the user by updating the user document
      await this.db.collection('users').doc(user!.uid).update({
        plantId: plantRef.id,
      });

      const alert = await this.alertController.create({
        header: 'Plant Created',
        message: 'New plant has been created.',
        buttons: ['OK']
        
      });
      await alert.present();
    } catch (error) {
      console.error('Error creating plant:', error);
    }
  }
}
