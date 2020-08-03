import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  title = "Settings"
  storedTheme:string;
  
  constructor(private router:Router) { }

  navigate(){
    this.router.navigate([
      {
        outlets: { chatbox: ['appearance' ] },
      },
    ]);
  }

  ngOnInit(): void {
    this.storedTheme = localStorage.getItem('rk-thema');
    if(this.storedTheme === ''){
      localStorage.setItem('rk-thema', 'thema-surya');
      this.storedTheme = localStorage.getItem('rk-thema');
    }
 }

}
