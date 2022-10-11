import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    })
  }
  login() {
    this.http.get<any>("http://localhost:3000/signupUsers").subscribe({
      next: (v) => {
        const user = v.find((a: any) => {
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        });
        if (user) {
          alert("login Successfull");
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        } else {
          alert("User not found !!");
        }
      },
      error: (e) => {
        alert("Something went wrong")

      },
      complete: () => console.info('complete')
    })
  }

}
