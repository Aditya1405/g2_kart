import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KartDashboardComponent } from './kart-dashboard/kart-dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
//import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
  //{ path: 'heroes', component: HeroesComponent }
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: KartDashboardComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }