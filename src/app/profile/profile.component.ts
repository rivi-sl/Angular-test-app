import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  title = "Profile"
  storedTheme: string;
  change: string;

  switchTheme(){
    if(this.storedTheme === 'thema-chandra'){
      localStorage.setItem('rk-thema', 'thema-surya');
    }else{
      localStorage.setItem('rk-thema', 'thema-chandra');
    }
    this.change = "Refresh browser to see updates."
  }

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.storedTheme = localStorage.getItem('rk-thema');
  }

}
