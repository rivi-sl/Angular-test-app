import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { GlobalchatComponent } from './globalchat/globalchat.component';
import { CommonchatComponent } from './commonchat/commonchat.component';
import { PrivatechatComponent } from './privatechat/privatechat.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    GlobalchatComponent,
    CommonchatComponent,
    PrivatechatComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
