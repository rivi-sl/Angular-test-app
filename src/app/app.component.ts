import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  storedTheme: string = localStorage.getItem('rk-thema');

  constructor(private router: Router) {
  }

  switchTheme(){
    if(this.storedTheme === 'thema-chandra'){
      localStorage.setItem('rk-thema', 'thema-surya');
    }else{
      localStorage.setItem('rk-thema', 'thema-chandra');
    }
    this.storedTheme = localStorage.getItem('rk-thema');
  }

  ngOnInit(): void {
    this.router.navigate(['/']);
  }
}