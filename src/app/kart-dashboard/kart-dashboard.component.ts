import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authentication.service';
@Component({
  selector: 'app-kart-dashboard',
  templateUrl: './kart-dashboard.component.html',
  styleUrls: ['./kart-dashboard.component.css']
})
export class KartDashboardComponent implements OnInit {
  user$: Observable<User | null> | undefined
  constructor(private authService: AuthService,) { }

  ngOnInit(): void {
    this.user$ = this.authService.currentUser$;
    //console.log("dashboard" + this.user$.name);
  }

}
