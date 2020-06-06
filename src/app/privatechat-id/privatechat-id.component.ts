import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of, Timestamp } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User } from '../services/user.model';
import { Message } from '../services/pm.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs/operators';
import { FormsModule, FormControl } from '@angular/forms'
import { AngularFireStorage } from '@angular/fire/storage';

export interface Item { name: string; }
export interface Chattype {
  id: number,
  sent: Timestamp<1>,
  sentBy: boolean,
  sender: string,
  message: string,
  image: string,
}
// export interface Chatinfo {
//   id: number,
//   lasttext: string,
//   lastdate: Date,
//   typing: boolean,
//   messages: number
// }

@Component({
  selector: 'app-privatechat-id',
  templateUrl: './privatechat-id.component.html',
  styleUrls: ['./privatechat-id.component.css']
})
export class PrivatechatIDComponent implements OnInit, OnDestroy {

  chat = '';

  idnum: number;
  private sub: any;
  private itemDoc: AngularFirestoreDocument<User>;
  friend: Observable<User>;
  // currentUser: Observable<User>;
  private msgsCollection: AngularFirestoreCollection<Chattype>;
  messageitems: Observable<Chattype[]>;

  imageURL = new FormControl('');
  selectedimgURL: any = null;
  imgSrc: string = '';

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private afs: AngularFirestore, public auth: AuthService, private storage: AngularFireStorage) {
    this.sub = this.route.params.subscribe(async params => {
      this.idnum = params.id;
      this.itemDoc = this.afs.doc<User>(`users/${params.id}`);
      this.friend = this.itemDoc.valueChanges();
      let currentUser =  await this.afAuth.currentUser;
      this.load(currentUser.uid, this.idnum);
    });
    
  }


  showImg(event:any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedimgURL = event.target.files[0];
    }else{
      this.imgSrc = '';
      this.selectedimgURL = null;
    }
  }

  imgclear(){
    this.imgSrc = '';
    this.selectedimgURL = null;
  }


  ngOnInit() {
    this.sub = this.route.params.subscribe(async params => {
      this.idnum = params.id;
      this.itemDoc = this.afs.doc<User>(`users/${params.id}`);
      this.friend = this.itemDoc.valueChanges();
      // return this.load();
    });
  }

  async load(uid, rid){
    this.msgsCollection = this.afs.collection<Chattype>(`messages/privateChats/${uid}/${rid}/messages`, ref => ref.orderBy('id'));
    this.messageitems = this.msgsCollection.valueChanges();
  }

  async sendMessage(){
      this.sub = this.route.params.subscribe(async params => {
        this.idnum = params.id;
        this.itemDoc = this.afs.doc<User>(`users/${params.id}`);
        this.friend = this.itemDoc.valueChanges();  
        const currentUser = await this.afAuth.currentUser;
        if(this.selectedimgURL){
          return this.sendimg(currentUser.uid, this.idnum, this.chat, this.selectedimgURL);
        }else{
          return this.checkmsg(currentUser.uid, this.idnum, this.chat);
        }
      });
       
  }

  checkmsg(uid, rid, chatm){
    const PMessagesinfo = this.afs.collection(`messages/privateChats/${uid}`).doc(`${rid}`);
    const PRMessagesinfo = this.afs.collection(`messages/privateChats/${rid}`).doc(`${uid}`);
    const PMessageschats = this.afs.collection(`messages/privateChats/${uid}/${rid}/messages`);
    const PRMessageschats = this.afs.collection(`messages/privateChats/${rid}/${uid}/messages`);
    this.chat = '';

    this.afs.collection(`messages/privateChats/${uid}`).doc(`${rid}`).ref.get()
    .then(async function(doc) {
      if(doc.data()){
        // console.log('yes')
        if(chatm){
        const chatdetail = {
          id: doc.data().id + 1,
          lasttext: chatm,
          sentBy: true,
          sender: uid,
          lastdate: new Date(),
          typing: false,
          messages: doc.data().messages + 1
        };
        PMessagesinfo.set(chatdetail)

        const chatRdetail = {
          id: doc.data().id + 1,
          lasttext: chatm,
          sentBy: false,
          sender: uid,
          lastdate: new Date(),
          typing: false,
          messages: doc.data().messages + 1
        };
        PRMessagesinfo.set(chatRdetail)
        
        const chatmessage = {
          id: doc.data().messages + 1,
          sent: new Date(),
          sentBy: true,
          sender: uid,
          message: chatm
        }

        PMessageschats.add(chatmessage)

        const chatRmessage = {
          id: doc.data().messages + 1,
          sent: new Date(),
          sentBy: false,
          sender: uid,
          message: chatm
        }

        PRMessageschats.add(chatRmessage)
      }
      }else{
        // console.log('null');
        if(chatm){
          const chatdetail = {
            id: 1,
            lasttext: chatm,
            sentBy: true,
            sender: uid,
            lastdate: new Date(),
            typing: false,
            messages: 1
          };
          PMessagesinfo.set(chatdetail)

          const chatRdetail = {
            id: 1,
            lasttext: chatm,
            sentBy: false,
            sender: uid,
            lastdate: new Date(),
            typing: false,
            messages: 1
          };
          PRMessagesinfo.set(chatRdetail)
          
          const chatmessage = {
            id: 1,
            sent: new Date(),
            sentBy: true,
            sender: uid,
            message: chatm
          }

          PMessageschats.add(chatmessage)

          const chatRmessage = {
            id: 1,
            sent: new Date(),
            sentBy: false,
            sender: uid,
            message: chatm
          }

          PRMessageschats.add(chatRmessage)
        }
      }
      
    });
  }

  sendimg(uid, rid, chatm, imgurl){
    if(this.imageURL.valid){
      var filePath = `${uid}/${rid}/${imgurl.name}_${new Date()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, imgurl).snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe((url)=>{
            const urlStorage = url;
            this.imageURL.reset();
            this.imgSrc = '';
            this.selectedimgURL = null;

            this.checkmsgimg(uid, rid, chatm, urlStorage);
          })
        })
      ).subscribe();     
    }

  }

  checkmsgimg(uid, rid, chatm, url){
    const PMessagesinfo = this.afs.collection(`messages/privateChats/${uid}`).doc(`${rid}`);
    const PRMessagesinfo = this.afs.collection(`messages/privateChats/${rid}`).doc(`${uid}`);
    const PMessageschats = this.afs.collection(`messages/privateChats/${uid}/${rid}/messages`);
    const PRMessageschats = this.afs.collection(`messages/privateChats/${rid}/${uid}/messages`);
    this.chat = '';

    this.afs.collection(`messages/privateChats/${uid}`).doc(`${rid}`).ref.get()
    .then(async function(doc) {
      if(doc.data()){
        // console.log('yes')
        const chatdetail = {
          id: doc.data().id + 1,
          lasttext: chatm,
          image: true,
          sentBy: true,
          sender: uid,
          lastdate: new Date(),
          typing: false,
          messages: doc.data().messages + 1
        };
        PMessagesinfo.set(chatdetail)

        const chatRdetail = {
          id: doc.data().id + 1,
          lasttext: chatm,
          image: true,
          sentBy: false,
          sender: uid,
          lastdate: new Date(),
          typing: false,
          messages: doc.data().messages + 1
        };
        PRMessagesinfo.set(chatRdetail)
        
        const chatmessage = {
          id: doc.data().messages + 1,
          sent: new Date(),
          image: url,
          sentBy: true,
          sender: uid,
          message: chatm
        }

        PMessageschats.add(chatmessage)

        const chatRmessage = {
          id: doc.data().messages + 1,
          sent: new Date(),
          image: url,
          sentBy: false,
          sender: uid,
          message: chatm
        }

        PRMessageschats.add(chatRmessage)
      }else{
        // console.log('null');
          const chatdetail = {
            id: 1,
            lasttext: chatm,
            image: true,
            sentBy: true,
            sender: uid,
            lastdate: new Date(),
            typing: false,
            messages: 1
          };
          PMessagesinfo.set(chatdetail)

          const chatRdetail = {
            id: 1,
            lasttext: chatm,
            image: true,
            sentBy: false,
            sender: uid,
            lastdate: new Date(),
            typing: false,
            messages: 1
          };
          PRMessagesinfo.set(chatRdetail)
          
          const chatmessage = {
            id: 1,
            sent: new Date(),
            image: url,
            sentBy: true,
            sender: uid,
            message: chatm
          }

          PMessageschats.add(chatmessage)

          const chatRmessage = {
            id: 1,
            sent: new Date(),
            image: url,
            sentBy: false,
            sender: uid,
            message: chatm
          }

          PRMessageschats.add(chatRmessage)
      }
      
    });
  }

  // createMessage(chat: Chat){
  //   return ;
  // }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

