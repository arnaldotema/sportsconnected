import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard} from './_guards/auth.guard';
import { PlayerComponent } from "./player/player.component";
import {TeamComponent} from './team/team.component';

const routes: Routes = [
  { path: '', redirectTo: '/player', pathMatch: 'full' },
  { path: 'player', component: PlayerComponent },
  { path: 'team', component: TeamComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
