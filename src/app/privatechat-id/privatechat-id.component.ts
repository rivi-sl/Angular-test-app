import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { User } from '../services/user.model';


export interface Item { name: string; }

@Component({
  selector: 'app-privatechat-id',
  templateUrl: './privatechat-id.component.html',
  styleUrls: ['./privatechat-id.component.css']
})
export class PrivatechatIDComponent implements OnInit {

  id: number;
  private sub: any;
  private itemDoc: AngularFirestoreDocument<User>;
  friend: Observable<User>;

  constructor(private route: ActivatedRoute, private afs: AngularFirestore) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params.id;
       console.log(params);
       this.itemDoc = this.afs.doc<User>(`users/${params.id}`);
       this.friend = this.itemDoc.valueChanges();
    });
    const id = +this.route.snapshot.paramMap.get('id');
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
