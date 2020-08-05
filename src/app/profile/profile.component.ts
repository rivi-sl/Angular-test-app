import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  title = "Profile";
  themeIcon:any = "../assets/icons/thema-chandra.png";
  storedTheme: string;
  change: string;


  constructor(public auth: AuthService,  public translate: TranslateService) { 
  }

  ngOnInit(): void {
    this.storedTheme = localStorage.getItem('rk-thema');
    if(this.storedTheme === ''){
      localStorage.setItem('rk-thema', 'thema-surya');
      this.storedTheme = localStorage.getItem('rk-thema');
    }
    
  }

}
