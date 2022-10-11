import { Injectable } from '@angular/core';
//import { RouterModule, Routes } from '@angular/router';
//making api calls 
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
}
