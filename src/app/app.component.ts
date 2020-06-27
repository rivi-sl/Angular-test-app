import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  storedTheme: string = localStorage.getItem('rk-thema');
  public storedLang: string;

  constructor(private router: Router, public translate: TranslateService) {
    const browserLang = localStorage.getItem('rk-bhasha');
    translate.use(browserLang.match(/en|si|ta/) ? browserLang : 'en');    
    this.storedLang = browserLang.match(/en|si|ta/) ? browserLang : 'en';

      
  }

  ngOnInit(): void {
    this.router.navigate(['/']);
  }
}
