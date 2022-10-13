import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { MartModel } from '../martDataModel';
import { AuthService } from '../services/authentication.service';
import { ApiService } from '../shared/api.service';
import { MartApiService } from '../shared/mart-api.service';
import { UserModel } from '../userDataModel';

@Component({
  selector: 'app-mart',
  templateUrl: './mart.component.html',
  styleUrls: ['./mart.component.css']
})
export class MartComponent implements OnInit {
  newQty: number = 0;

  //
  userDataModel: UserModel = new UserModel();
  user$: Observable<User | null> | undefined
  email?: string = "";
  //

  martDataModel: MartModel = new MartModel();
  martArray: MartModel[] = [];
  constructor(
    private martApi: MartApiService,
    private authService: AuthService,
    private api: ApiService) { }

  ngOnInit(): void {
    //
    this.user$ = this.authService.currentUser$;
    this.user$.subscribe(
      (v) => {
        this.email = JSON.stringify(v?.email);
        console.log("profile" + v?.email)
        this.getUserDetail(this.email);
        // this.userDataModel = this.authService.getUserDetail();
        console.log("from profile " + this.userDataModel)
      }
    )
    //
    this.get();
  }
  //
  updateUserCart() {

  }
  getUserDetail(email: string) {
    //add email to get as aparam for get id
    this.api.get(email).subscribe({
      next: (v) => {
        //console.log("profile = " + JSON.parse(v));
        this.userDataModel = v[0];
        console.log("success from mart = " + this.userDataModel.email);
      },
      error: (e) => console.error("failed"),
      complete: () => console.info('complete')
    })
  }
  //
  get() {
    this.martApi.get().subscribe({
      next: (v) => {
        this.martArray = v;
        //this.martDataModel = v[0];
        console.log("success for mart array= " + this.martArray.length);
      },
      error: (e) => console.error("failed"),
      complete: () => console.info('complete')
    })
  }
  update(id: number) {
    console.log("mart id = " + id);
    //check if curr item > 0
    this.addToUserCart();
    if (this.martDataModel.qty > 0) {
      this.newQty++;
      this.martDataModel.qty--;
      //add to user cart if not already there else + 1

    }
    this.martApi.update(this.martDataModel, this.martDataModel.id).subscribe(
      {
        next: (v) => {
          console.log("success= ");
        },
        error: (e) => console.error("failed"),
        complete: () => console.info('complete')
      }
    )
    console.log("pressed id= " + id);
  }

  //
  addToUserCart() {
    //loop throught the cart
    for (let i = 0; i < this.userDataModel.cart.length; i++) {
      //if(this.userDataModel.cart[i].name==)
      console.log("add user = " + i + " cart = " + this.userDataModel.cart[i].name);
    }
  }
  //
}
