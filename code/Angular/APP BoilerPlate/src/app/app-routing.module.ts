import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard} from './_guards/auth.guard';

const routes: Routes = [
  /*{ path: '', redirectTo: '/case-list', pathMatch: 'full' },
  { path: 'case-list', component: null },
  { path: 'case/:id', component: null, canActivate: [AuthGuard] }*/
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
