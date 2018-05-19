import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard} from './_guards/auth.guard';
import { User_infoComponent } from "./user_info/user_info.component";
import {TeamComponent} from './team/team.component';
import {User_infoMediaComponent} from './user-info-media/user-info-media.component';

const routes: Routes = [
  { path: '', redirectTo: '/userInfo', pathMatch: 'full' },
  { path: 'userInfo', component: User_infoComponent },
  { path: 'userMedia', component: User_infoMediaComponent },
  { path: 'team', component: TeamComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
