import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from './user.model';

export interface Item { name: string; }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;
  private itemDoc: AngularFirestoreDocument<Item>;
  item: Observable<Item>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {
        this.user$ = this.afAuth.authState.pipe(
          switchMap(user => {
            if(user) {
              return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
            } else{
              return of(null);
            }
          })
        )
     }

     async googleSignin(){
       const provider = new auth.GoogleAuthProvider();
       const credential = await this.afAuth.signInWithPopup(provider);
       return this.updateUserData(credential.user);
     }

     async signOut(){
       await this.afAuth.signOut();
       return this.router.navigate(['/']);
     }

     private updateUserData(user){
       
      const usersDb = this.afs.doc(`users/${user.uid}`);
      const usersDbchanges = this.afs.doc(`users/${user.uid}`).valueChanges();
      var joinedIntext;
      // this.itemDoc = this.afs.doc<Item>(`users/${user.uid}`);
      // this.item = this.itemDoc.valueChanges();

      this.afs.collection("users").doc(`${user.uid}`).ref.get()
      .then(async function(doc) {
        console.log(doc.data());
      });

      // if(doc.data().joinedIn == ""){
      //   joinedIntext = new Date();
      // }else{
      //   joinedIntext = await doc.data().joinedIn;
      // }
      
      // console.log(this.item.joinedIn);

        const data = {
          uid: user.uid, 
          email: user.email, 
          displayName: user.displayName, 
          photoURL: user.photoURL,
          joinedIn: joinedIntext
        }

        usersDb.set(data);

      }

}
