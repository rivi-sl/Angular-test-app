import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

export interface Item { name: string; }

@Component({
  selector: 'app-privatechat',
  templateUrl: './privatechat.component.html',
  styleUrls: ['./privatechat.component.css']
})
export class PrivatechatComponent implements OnInit {
  title = "Private Chat"

  private itemsCollection: AngularFirestoreCollection<Item>;
  users: Observable<Item[]>;
  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('users');
    this.users = this.itemsCollection.valueChanges();
  }

  ngOnInit(): void {
  }

}
