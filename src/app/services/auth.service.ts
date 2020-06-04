import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MenuItemsOptions } from '../menuitemsoptions';
import { MenuItems } from '../menuitems';

import { User } from './user.model';

export interface Item { name: string; }
export interface MyID { id: string; }


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;
  userid: Observable<any>;
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

     private async updateUserData(user){
       
      const usersDb = this.afs.doc(`users/${user.uid}`);
      // const usersDbchanges = this.afs.doc(`users/${user.uid}`).valueChanges();
      var joinedIntext;

      this.afs.collection("users").doc(`${user.uid}`).ref.get()
      .then(async function(doc) {
        if(doc.data()){
          joinedIntext = await doc.data().joinedIn;
        }else{
          joinedIntext = new Date();
        }
        const data = {
          uid: user.uid, 
          email: user.email, 
          displayName: user.displayName, 
          photoURL: user.photoURL,
          joinedIn: await joinedIntext
        }

        usersDb.set(data);
      });
      }

}
