import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { AddUser } from '../services/adduser';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

export interface Item { name: string; }

@Component({
  selector: 'app-privatechat',
  templateUrl: './privatechat.component.html',
  styleUrls: ['./privatechat.component.css']
})
export class PrivatechatComponent implements OnInit {

  title = "Private Chat";
  storedTheme: string;

  constructor(private afs: AngularFirestore, private router:Router, private afAuth: AngularFireAuth, public auth: AuthService,) {
    this.itemsCollection = afs.collection<Item>('users');
    this.users = this.itemsCollection.valueChanges();
  }


  gotoFriend(user: AddUser): void {
    this.router.navigate([
      {
        outlets: { chatbox: ['private', user.uid] },
      },
    ], 
    { skipLocationChange: true });
  }
  async friendAdd(user: AddUser): Promise<void> {
    let currentUser = await this.afAuth.currentUser;
    this.friendplus(user.uid, currentUser.uid);
  }

  friendplus(friend, user){
    var userFriends = [];
    const friends = this.afs.collection(`users`).doc(`${user}`);
    const friendsDetails = this.afs.collection(`users/${user}/friends`).doc(`${friend}`);

    this.afs.collection(`users/${user}/friends`).ref.get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(async function(doc) {
            userFriends.push(doc.data().id)
        });
    })


    for(var i=0; i<userFriends.length; i++){
      console.log(userFriends[i])
    }


  friends.ref.get()
    .then(async function(doc) {

      // console.log(doc.data().friends);
      var noFriends = await doc.data().friends;

      if(!noFriends){
        noFriends = 0;
      }
      const friendAddDetails = {
        friends: await noFriends + 1,
      };
      friends.update(friendAddDetails);
    });

  friendsDetails.ref.get()
    .then(async function(doc) {
      const friendAddDetails = {
        id: friend
      };

      friendsDetails.set(friendAddDetails);


  })

}

  private itemsCollection: AngularFirestoreCollection<Item>;
  users: Observable<Item[]>;

 
  ngOnInit(): void {
    this.storedTheme = localStorage.getItem('rk-thema');
    if(this.storedTheme === ''){
      localStorage.setItem('rk-thema', 'thema-surya');
      this.storedTheme = localStorage.getItem('rk-thema');
    }
  }

}
