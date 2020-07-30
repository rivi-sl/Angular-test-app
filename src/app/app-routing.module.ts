import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GlobalchatComponent } from './globalchat/globalchat.component';
import { CommonchatComponent } from './commonchat/commonchat.component';
import { PrivatechatComponent } from './privatechat/privatechat.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';

import { PrivatechatIDComponent } from './privatechat-id/privatechat-id.component';

import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AppearenceComponent } from './settings/appearence/appearence.component';


const routes: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  // { path: '**', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'common', component: GlobalchatComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'group', component: CommonchatComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'private', component: PrivatechatComponent, canActivate: [AngularFireAuthGuard]  },
  {
    path: 'private/:id',
    component: PrivatechatIDComponent,
    outlet: 'chatbox',
  },
  {path:'settings/appearance',
  component:AppearenceComponent,
   outlet:'chatbox',
   },
  { path: 'settings', component: SettingsComponent, canActivate: [AngularFireAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }