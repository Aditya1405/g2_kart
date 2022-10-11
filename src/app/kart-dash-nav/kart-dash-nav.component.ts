import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authentication.service';

@Component({
  selector: 'app-kart-dash-nav',
  templateUrl: './kart-dash-nav.component.html',
  styleUrls: ['./kart-dash-nav.component.css']
})
export class KartDashNavComponent implements OnInit {
  user$: Observable<User | null> | undefined

  constructor(
    private authService: AuthService,
    // public usersService: UsersService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.user$ = this.authService.currentUser$;
    //console.log("dashboard" + this.user$.name);
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
