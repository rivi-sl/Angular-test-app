import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { User } from '../services/user.model';
import { Message } from '../services/pm.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs/operators';



export interface Item { name: string; }
export interface Chat {
  id: number;
  text: string;
}

@Component({
  selector: 'app-privatechat-id',
  templateUrl: './privatechat-id.component.html',
  styleUrls: ['./privatechat-id.component.css']
})
export class PrivatechatIDComponent implements OnInit {

  id: number;
  private sub: any;
  user$: Observable<any>;
  private itemDoc: AngularFirestoreDocument<User>;
  friend: Observable<User>;
  private PMessages: AngularFirestoreDocument<Message>;
  PMessage: Observable<Message>;
  
  chat: Chat = {
    id: 1,
    text: ''
  };

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private afs: AngularFirestore, public auth: AuthService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(async params => {
       this.id = +params.id;
       this.itemDoc = this.afs.doc<User>(`users/${params.id}`);
       this.friend = this.itemDoc.valueChanges();
       console.log(await this.afAuth.currentUser);
      //  this.PMessages = this.afs.doc<Message>(`messages/privateChats/${this.auth.user$.uid}`);
      //  this.friend = this.itemDoc.valueChanges();
    });
    const id = +this.route.snapshot.paramMap.get('id');
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

