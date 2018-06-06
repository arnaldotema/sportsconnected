import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard} from './_guards/auth.guard';
import { User_infoComponent } from "./user_info/user_info.component";
import {TeamComponent} from './team/team.component';
import {HomeComponent} from './home/home.component';
import {MatchComponent} from './match/match.component';

const routes: Routes = [
  { path: '', redirectTo: '/userInfo', pathMatch: 'full' },
  { path: 'userInfo', component: User_infoComponent },
  { path: 'team', component: TeamComponent },
  { path: 'home', component: HomeComponent },
  { path: 'match', component: MatchComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
