import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../shared/user-data.service';
import { UserModel } from '../userDataModel';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDataModel: UserModel = new UserModel();


  constructor(
    private router: Router,
    private usrData: UserDataService
  ) { }
  
  ngOnInit(): void {
    this.usrData.getUser();
    this.usrData.emitUDM.subscribe(
      (data: UserModel) => {
        this.userDataModel = data;
        console.log("UDM model" + JSON.stringify(this.userDataModel));
      }
    )
  }


  back() {
    this.router.navigate(['/dashboard']);
  }
}
