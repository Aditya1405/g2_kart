import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
//
import { KartDashboardComponent } from './kart-dashboard/kart-dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { KartDashNavComponent } from './kart-dash-nav/kart-dash-nav.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { HotToastModule } from '@ngneat/hot-toast';
import { ProfileComponent } from './profile/profile.component';
import { MartComponent } from './mart/mart.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { MartApiService } from './shared/mart-api.service';
import { UserDataService } from './shared/user-data.service';
import { ApiService } from './shared/api.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    KartDashboardComponent,
    KartDashNavComponent,
    ProfileComponent,
    MartComponent,
    UserCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    HotToastModule.forRoot()
  ],
  providers: [MartApiService, UserDataService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
