import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MartModel } from '../martDataModel';
import { UserDataService } from '../shared/user-data.service';
import { UserModel } from '../userDataModel';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  userDataModel: UserModel = new UserModel();

  martDataModel: MartModel = new MartModel();
  martArray: MartModel[] = [];

  totalAmount: number | undefined;

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
    );
    this.usrData.emitTA.subscribe(
      (data: number) => {
        this.totalAmount = data;
        console.log("TDA" + this.totalAmount);
      }
    );
    console.log("TDA out" + this.totalAmount);
  }
  getTA() {
    console.log("TDA out" + this.totalAmount);
  }
  // totalCost() {
  //   let tc: number = 0;
  //   this.martArray = this.userDataModel.cart;
  //   for (let i = 0; i < this.martArray.length; i++) {
  //     let amt = this.martArray[i].price;
  //     let qty = this.martArray[i].qty;
  //     let cost = qty * amt;
  //     tc += cost;
  //   }
  //   this.totalAmount = tc;
  //   console.log("tc" + tc);
  //   return tc;
  // }

}
