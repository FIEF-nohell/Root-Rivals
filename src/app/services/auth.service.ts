import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public uid: any;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private alertController: AlertController) { }

  async createUserWithEmailAndPassword(email:string, password:string, name:string){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password).then((credential:any) => {
        credential!.user.updateProfile({
          displayName: name,
        })
      }).then(
        async res => {
          await this.afAuth.user.subscribe(user => {
            
            this.uid = user!.uid

            this.db.collection("users/").doc(this.uid).set({
              name: name,
              email: email.toLowerCase(),
              uid: this.uid,
              plantId: null,
            }).then(async ses => {
              location.reload();
            })
          })
        },
        async err => {
          const alert = await this.alertController.create({
            header: "Oopsie",
            message: err.message,
            buttons: ["RETRY"]
          })
          await alert.present();
        }
      )
    })
  }

  async getUid() {
    await this.afAuth.user.subscribe(user => { 
      if (user) {
        this.uid = user.uid
      }
    })
  }

  async signInWithEmailAndPassword(email:string, password:string){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
      .then(
        res => {
          location.reload();
        },
        async err => {
          const alert = await this.alertController.create({
            header: "Oopsie",
            message: err.message,
            buttons: ["RETRY"]
          })
          await alert.present();
        }
      )
    })
  }

  async signOut(){
    return new Promise<void>(async (resolve, reject) => {
      if (await this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => {
            resolve();
            location.reload();
          }).catch((error) => {
            reject();
        });
      }
    })
  }

  userDetails(){
    return this.afAuth.user;
  }

}
