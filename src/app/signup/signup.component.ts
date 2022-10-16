import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NonNullableFormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../services/authentication.service';
import { ApiService } from '../shared/api.service';
import { UserModel } from '../userDataModel';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signUpForm!: FormGroup;
  //use this to post your data
  userDataModel: UserModel = new UserModel();
  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private api: ApiService,
    private toast: HotToastService,
    //private usersService: UsersService,
    private fb: NonNullableFormBuilder) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      contact: [''],
      address: [''],
      // gender: ['']
    })
  }
  signUp() {

    console.log(this.signUpForm.value);
    const { name, email, password, contact, address } = this.signUpForm.value;
    if (!this.signUpForm.valid || !name || !password || !email || !contact || !address) {
      return;
    }


    this.authService.signUp(name, email, password).pipe(

      this.toast.observe({
        success: 'congrats = signup',
        loading: 'signing in',
        error: ({ message }) => `${message}`
      })
    ).subscribe(() => {
      this.postUserDetail(name, email, contact, address);

      this.router.navigate(['/']);
    });

  }

  postUserDetail(name: string, email: string, contact: number, address: string) {
    this.userDataModel.name = name;
    this.userDataModel.email = email;
    this.userDataModel.address = address;
    this.userDataModel.contact = contact;
    this.api.post(this.userDataModel).subscribe({
      next: (v) => console.log("success"),
      error: (e) => console.error("failed"),
      complete: () => console.info('complete')
    })
  }
}
