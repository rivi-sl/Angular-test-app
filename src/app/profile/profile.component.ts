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

  switchTheme(){
    if(this.storedTheme === 'thema-chandra'){
      localStorage.setItem('rk-thema', 'thema-surya');
    }else{
      localStorage.setItem('rk-thema', 'thema-chandra');
    }
    // this.change = "Refresh browser to see updates."
    //alert('Refresh browser to see updates.');
    location.reload();
  }

  switchLang(lang){
    this.translate.use(lang);
    localStorage.setItem('rk-bhasha', lang);
  }

  constructor(public auth: AuthService,  public translate: TranslateService) { 
  }

  ngOnInit(): void {
    this.storedTheme = localStorage.getItem('rk-thema');
    if(this.storedTheme === ''){
      localStorage.setItem('rk-thema', 'thema-surya');
      this.storedTheme = localStorage.getItem('rk-thema');
    }
    if(this.storedTheme == 'thema-chandra'){
      this.themeIcon = "../assets/icons/thema-chandra.png";
    }else{
      this.themeIcon = "../assets/icons/thema-surya.png";
    }
  }

}
