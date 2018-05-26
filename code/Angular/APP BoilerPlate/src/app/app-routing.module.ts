import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard} from './_guards/auth.guard';
import { User_infoComponent } from "./user_info/user_info.component";
import {TeamComponent} from './team/team.component';
import {User_infoMediaComponent} from './user-info-media/user-info-media.component';
import {User_infoStatsComponent} from './user-info-stats/user-info-stats.component';
import {TeamRosterComponent} from './team-roster/team-roster.component';

const routes: Routes = [
  { path: '', redirectTo: '/userInfo', pathMatch: 'full' },
  { path: 'userInfo', component: User_infoComponent },
  { path: 'userMedia', component: User_infoMediaComponent },
  { path: 'userStats', component: User_infoStatsComponent },
  { path: 'team', component: TeamComponent },
  { path: 'teamRoster', component: TeamRosterComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
