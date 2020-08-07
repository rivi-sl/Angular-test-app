import { Component, OnInit } from '@angular/core';
import {trigger,state,style,animate,transition} from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-appearence',
  animations: [
    trigger('theme-selector', [

      state('selected', style({
      
      })),
      state('notselected', style({
        boxShadow:'none'
      })),
    ]),

    trigger('lang-selector', [

      state('selected', style({
      
      })),
      state('notselected', style({
        boxShadow:'none'
      })),
    ]),
  ],
  templateUrl: './appearence.component.html',
  styleUrls: ['./appearence.component.css']
})
export class AppearenceComponent implements OnInit {
storedTheme: string;
Selected:boolean;
changed:boolean;


switchThemechandra(){
    if(this.storedTheme === 'thema-surya'){
      localStorage.setItem('rk-thema', 'thema-chandra');
      location.reload();
    };
    // this.change = "Refresh browser to see updates."
    //alert('Refresh browser to see updates.');
  }

switchThemesurya(){
    if(this.storedTheme === 'thema-chandra'){
      localStorage.setItem('rk-thema', 'thema-surya');
      location.reload();
    };
    // this.change = "Refresh browser to see updates."
    //alert('Refresh browser to see updates.');
  }
  
  switchLang(lang){
    this.translate.use(lang);
    localStorage.setItem('rk-bhasha', lang);
    this.changed = true;
  }

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    this.storedTheme = localStorage.getItem('rk-thema');
    if(this.storedTheme === ''){
      localStorage.setItem('rk-thema', 'thema-surya');
      this.storedTheme = localStorage.getItem('rk-thema');
    }

    if(this.storedTheme == 'thema-chandra'){
      this.Selected = true;
    }else{
      this.Selected = false;
    }

  }

}
