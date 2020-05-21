import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';

import { GlobalchatComponent } from './globalchat/globalchat.component';
import { CommonchatComponent } from './commonchat/commonchat.component';
import { PrivatechatComponent } from './privatechat/privatechat.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
  { path: '', redirectTo: '/global', pathMatch: 'full' },
  { path: 'global', component: GlobalchatComponent },
  { path: 'common', component: CommonchatComponent },
  { path: 'private', component: PrivatechatComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }