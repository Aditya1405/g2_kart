import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NonNullableFormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../services/authentication.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signUpForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService,
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
    console.log('works');
    // this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value).subscribe(res => {
    //   alert("Signup Successfull");
    //   this.signupForm.reset();
    //   this.router.navigate(['login']);
    // }, err => {
    //   alert("Something went wrong")
    // })
    // this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value).subscribe({
    //   next: (v) => {
    //     alert("Signup Successfull");
    //     this.signupForm.reset();
    //     this.router.navigate(['login']);
    //   },
    //   error: (e) => {
    //     alert("Something went wrong")

    //   },
    //   complete: () => console.info('complete')
    // })
    console.log(this.signUpForm.value);
    const { name, email, password } = this.signUpForm.value;
    if (!this.signUpForm.valid || !name || !password || !email) {
      return;
    }


    this.authService.signUp(name, email, password).pipe(
      // switchMap(({ user: { uid } }) =>
      //   this.usersService.addUser({ uid, email, displayName: name })
      // ),
      // this.toast.observe({
      //   success: 'Congrats! You are all signed up',
      //   loading: 'Signing up...',
      //   error: ({ message }) => `${message}`,
      // })
      this.toast.observe({
        success: 'congrats = signup',
        loading: 'signing in',
        error: ({ message }) => `${message}`
      })
    ).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
