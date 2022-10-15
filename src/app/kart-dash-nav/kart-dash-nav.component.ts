import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authentication.service';
import { MartApiService } from '../shared/mart-api.service';

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
    private service: MartApiService
  ) { }
  ngOnInit(): void {
    this.user$ = this.authService.currentUser$;
    //console.log("dashboard" + this.user$.name);
    this.service.emitNum.subscribe(
      (count: number) => {
        this.toggle = count;
        console.log("rec" + this.toggle);
      }
    );

  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  getItemCount() {

  }
}
