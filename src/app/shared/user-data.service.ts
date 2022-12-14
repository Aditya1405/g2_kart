import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { User } from '@angular/fire/auth/firebase';
import { Observable } from 'rxjs';
import { MartModel } from '../martDataModel';
import { AuthService } from '../services/authentication.service';
import { UserModel } from '../userDataModel';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  // contains user login detail like email
  // using email we can fetch its data from json server
  // then we can store that data on a user model data here which will be accesible to all
  user$: Observable<User | null> | undefined
  email?: string = "";
  //prize
  userDataModel: UserModel = new UserModel();
  emitUDM = new EventEmitter<UserModel>();

  martDataModel: MartModel = new MartModel();
  martArray: MartModel[] = [];

  totalAmount: number = 0;
  emitTA = new EventEmitter<number>();

  cartCount: number = 0;
  emitCC = new EventEmitter<number>();

  constructor(
    // private martApi: MartApiService,
    private authService: AuthService,
    private api: ApiService) { }

  getUser() {
    this.authService.currentUser$.subscribe(
      (v) => {
        this.email = JSON.stringify(v?.email);
        console.log("profile" + v?.email)
        this.getUserDetail(this.email);
        this.emitUDM.subscribe(
          (data: UserModel) => {
            this.userDataModel = data;
            console.log("rec" + JSON.stringify(this.userDataModel));
          }
        )
      }
    )
  }
  //this should set user data model from json server
  getUserDetail(email: string) {
    this.api.get(email).subscribe({
      next: (v) => {
        //v.return type => [{}]
        this.userDataModel = v[0];
        this.emitUDM.emit(this.userDataModel);
        console.log("success from mart = " + this.userDataModel.email);
      },
      error: (e) => console.error("failed"),
      complete: () => console.info('complete')
    })
  }

  totalCost() {
    let tc: number = 0;
    let cc: number = 0;
    this.martArray = this.userDataModel.cart;
    for (let i = 0; i < this.martArray.length; i++) {
      let amt = this.martArray[i].price;
      let qty = this.martArray[i].qty;
      cc += qty;
      let cost = qty * amt;
      tc += cost;
    }
    this.totalAmount = tc;
    this.cartCount = cc;
    console.log("tc" + tc);
    this.emitTA.emit(this.totalAmount);
    this.emitCC.emit(this.cartCount);
    //return tc;
  }
}
