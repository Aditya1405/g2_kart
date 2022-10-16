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
  toggle: number | undefined;
  constructor(
    private authService: AuthService,
    // public usersService: UsersService,
    private router: Router,
    private service: MartApiService,
    private usrData: UserDataService
  ) { }
  ngOnInit(): void {
    this.user$ = this.authService.currentUser$;
    this.service.emitNum.subscribe(
      (count: number) => {
        this.toggle = count;
      }
    );

  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  setTotalCost() {
    this.usrData.totalCost();
  }
}
