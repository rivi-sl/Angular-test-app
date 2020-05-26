import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { AddUser } from '../services/adduser';

export interface Item { name: string; }

@Component({
  selector: 'app-privatechat',
  templateUrl: './privatechat.component.html',
  styleUrls: ['./privatechat.component.css']
})
export class PrivatechatComponent implements OnInit {

  title = "Private Chat"


  selectedUser: AddUser;
  friendAdd(user: AddUser): void {
    this.selectedUser = user;
    this.router.navigate([
      {
        outlets: { chatbox: ['private', user.uid] },
      },
    ], 
    { skipLocationChange: true });
  }

  private itemsCollection: AngularFirestoreCollection<Item>;
  users: Observable<Item[]>;

  constructor(private afs: AngularFirestore, private router:Router) {
    this.itemsCollection = afs.collection<Item>('users');
    this.users = this.itemsCollection.valueChanges();
  }

  ngOnInit(): void {
  }

}
