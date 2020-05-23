import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';

import { GlobalchatComponent } from './globalchat/globalchat.component';
import { CommonchatComponent } from './commonchat/commonchat.component';
import { PrivatechatComponent } from './privatechat/privatechat.component';
import { SettingsComponent } from './settings/settings.component';

import { AngularFireAuthGuard } from '@angular/fire/auth-guard';


const routes: Routes = [
  { path: '', redirectTo: '/common', pathMatch: 'full' },
  { path: 'common', component: GlobalchatComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'group', component: CommonchatComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'private', component: PrivatechatComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AngularFireAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }