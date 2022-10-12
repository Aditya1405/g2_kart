import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authentication.service';
import { ApiService } from '../shared/api.service';
import { UserModel } from '../userDataModel';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDataModel: UserModel = new UserModel();
  user$: Observable<User | null> | undefined
  email?: string = "";

  constructor(
    private authService: AuthService,
    private api: ApiService) { }
  ngOnInit(): void {
    this.user$ = this.authService.currentUser$;
    this.user$.subscribe(
      (v) => {
        this.email = JSON.stringify(v?.email);
        console.log("profile" + v?.email)
        //this.getUserDetail(this.email);
        this.userDataModel = this.authService.getUserDetail();
        console.log("from profile " + this.userDataModel)
      }
    )

    //console.log("dashboard" + this.user$.name);
  }

  // getUserDetail(email: string) {
  //   //add email to get as aparam for get id
  //   this.api.get(email).subscribe({
  //     next: (v) => {
  //       //console.log("profile = " + JSON.parse(v));
  //       this.userDataModel = v[0];
  //       console.log("success= " + this.userDataModel.cart.length);
  //     },
  //     error: (e) => console.error("failed"),
  //     complete: () => console.info('complete')
  //   })
  // }

}
