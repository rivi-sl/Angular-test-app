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
export interface Chatinfo {
  id: number,
  lasttext: string,
  typing: boolean,
  messages: number
}
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

  private PMessagesinfo: AngularFirestoreDocument<Chatinfo>;

  private PMessages: AngularFirestoreCollection<Message>;
  PMessagesLoad: Observable<Message[]>;
  
  // chat: 

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private afs: AngularFirestore, public auth: AuthService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(async params => {
       this.id = +params.id;
       this.itemDoc = this.afs.doc<User>(`users/${params.id}`);
       this.friend = this.itemDoc.valueChanges();
      //  const currentUser = await this.afAuth.currentUser;
      //  console.log(currentUser.uid)
      //  this.PMessages = this.afs.collection<Message>(`messages/privateChats/1/1/messages/`);
      this.PMessagesinfo = this.afs.doc<Chatinfo>('messages/privateChats/1/1');
      const chat = {
        id: 0,
        lasttext: '',
        typing: false,
        messages: 0
      };
      this.PMessagesinfo.set(chat)
      //  this.PMessages = this.afs.collection<Message>(`messages/privateChats/${currentUser.uid}/${params.id}/messages/`);
      //  this.PMessagesLoad = this.PMessages.valueChanges();
       
    });
    const id = +this.route.snapshot.paramMap.get('id');
  }

  // createMessage(chat: Chat){
  //   return ;
  // }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

