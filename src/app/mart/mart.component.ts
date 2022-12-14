import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { MartModel } from '../martDataModel';
import { AuthService } from '../services/authentication.service';
import { ApiService } from '../shared/api.service';
import { MartApiService } from '../shared/mart-api.service';
import { UserDataService } from '../shared/user-data.service';
import { UserModel } from '../userDataModel';

@Component({
  selector: 'app-mart',
  templateUrl: './mart.component.html',
  styleUrls: ['./mart.component.css']
})
export class MartComponent implements OnInit {


  //ser
  userDataModel: UserModel = new UserModel();
  user$: Observable<User | null> | undefined
  email?: string = "";
  //

  martDataModel: MartModel = new MartModel();
  martArray: MartModel[] = [];
  constructor(
    private martApi: MartApiService,
    private authService: AuthService,
    private api: ApiService,
    private usrData: UserDataService) { }

  ngOnInit(): void {
    //
    this.usrData.getUser();
    this.usrData.emitUDM.subscribe(
      (data: UserModel) => {
        this.userDataModel = data;
        console.log("UDM model" + JSON.stringify(this.userDataModel));
      }
    )
    //
    this.get();

  }

  get() {
    this.martApi.get().subscribe({
      next: (v) => {
        this.martArray = v;
        //this.martDataModel = v[0];
        console.log("up success for mart array= " + JSON.stringify(this.martArray));
      },
      error: (e) => console.error("failed"),
      complete: () => console.info('complete')
    })
  }
  update(id: number) {
    console.log("up mart id = " + id);
    //get the martItemObject from mart array

    //check if curr item > 0

    if (this.martArray[id - 1].qty > 0) {
      this.addToUserCart(id);
      //console.log("up: martArrayId = " + JSON.stringify(this.martArray[id - 1]));
      this.martArray[id - 1].qty--;
      //add to user cart if not already there else + 1
      //console.log("up: martArrayId = " + JSON.stringify(this.martArray[id - 1]));
    }
    this.martApi.update(this.martArray[id - 1], id).subscribe(
      {
        next: (v) => {
          console.log("up: success= ");
        },
        error: (e) => console.error("failed"),
        complete: () => console.info('complete')
      }
    )
    console.log("pressed id= " + id);
  }

  //add to user cart in this page but does not updates it on the server
  addToUserCart(id: number) {
    console.log("item id= " + id);
    //this.newQty++;
    //this updates total count in cart nav
    this.martApi.updateCartCount();
    let mart = new MartModel();
    mart = Object.assign({}, this.martArray[id - 1]);
    if (this.userDataModel.cart.length == 0) {
      mart.qty = 1;
      this.userDataModel.cart.push(mart);
    } else {
      let updatestatus: boolean = true;
      for (let i = 0; i < this.userDataModel.cart.length; i++) {
        if (this.userDataModel.cart[i].id == id) {
          console.log("true");
          this.userDataModel.cart[i].qty++;
          updatestatus = false;
        }
      }
      if (updatestatus) {
        mart.qty = 1;
        this.userDataModel.cart.push(mart);
      }
    }

    console.log("final cart = " + JSON.stringify(this.userDataModel));
    //push to user cart
    this.api.updateUserInfo(this.userDataModel, this.userDataModel.id).subscribe(
      {
        next: (v) => {
          console.log("Usr: success= " + JSON.stringify(v));
        },
        error: (e) => console.error("failed"),
        complete: () => console.info('complete')
      }
    );
  }
}
