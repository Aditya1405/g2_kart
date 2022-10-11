import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      contact: [''],
      address: [''],
      // gender: ['']
    })
  }
  signUp() {
    // this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value).subscribe(res => {
    //   alert("Signup Successfull");
    //   this.signupForm.reset();
    //   this.router.navigate(['login']);
    // }, err => {
    //   alert("Something went wrong")
    // })
    this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value).subscribe({
      next: (v) => {
        alert("Signup Successfull");
        this.signupForm.reset();
        this.router.navigate(['login']);
      },
      error: (e) => {
        alert("Something went wrong")

      },
      complete: () => console.info('complete')
    })
  }
}
