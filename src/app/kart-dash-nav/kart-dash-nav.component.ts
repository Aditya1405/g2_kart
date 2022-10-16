import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authentication.service';
import { MartApiService } from '../shared/mart-api.service';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-kart-dash-nav',
  templateUrl: './kart-dash-nav.component.html',
  styleUrls: ['./kart-dash-nav.component.css']
})
export class KartDashNavComponent implements OnInit {
  user$: Observable<User | null> | undefined
  toggle: number = 0;
  CC: number = 0;
  //total: number = this.toggle + this.CC
  constructor(
    private authService: AuthService,
    // public usersService: UsersService,
    private router: Router,
    private service: MartApiService,
    private usrData: UserDataService,
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {


    this.user$ = this.authService.currentUser$;
    this.service.emitNum.subscribe(
      (count: number) => {
        this.toggle = count;
      }
    );
    this.usrData.emitCC.subscribe(
      (data: number) => {
        this.CC = data;
        console.log("KDN" + this.CC);
      }
    );
    // if (this.CC == 0) {
    //   this.ngOnInit();
    //   console.log("ng on init = KartDashNavComponent before login and cc = " + this.CC);

    // } else {
    //   console.log("ng on init = KartDashNavComponent after login and cc = " + this.CC);
    // }
  }
  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
  logout() {
    this.toggle = 0;
    this.CC = 0;
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });

  }

  setTotalCost() {
    this.usrData.totalCost();
  }
}
