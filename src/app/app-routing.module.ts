import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KartDashboardComponent } from './kart-dashboard/kart-dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
//import { HeroesComponent } from './heroes/heroes.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { ProfileComponent } from './profile/profile.component';
import { UserCartComponent } from './user-cart/user-cart.component';
//tells to generate a pipe and route our unlogged in user to login page
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
//when we are logged in already  it makes little sense to allow the user to login or sign up again,
//so the user should log out if the want to goto any other routes
const redirectLoggedInToHome = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  //{ path: 'heroes', component: HeroesComponent }
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //auth gaurd
  { path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToHome) },
  { path: 'signup', component: SignupComponent, ...canActivate(redirectLoggedInToHome) },
  { path: 'dashboard', component: KartDashboardComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'profile', component: ProfileComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'cart', component: UserCartComponent, ...canActivate(redirectUnauthorizedToLogin) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }