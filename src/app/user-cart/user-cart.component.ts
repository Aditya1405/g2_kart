import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../shared/user-data.service';
import { UserModel } from '../userDataModel';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

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

  onInc(id: number) {
    console.log("inc = " + id);
  }
  onDec(id: number) {
    console.log("dec = " + id);
  }

}
