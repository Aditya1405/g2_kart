import { Injectable } from '@angular/core';
//import { RouterModule, Routes } from '@angular/router'0;
//making api calls 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  post(data: any) {
    return this.http.post<any>("http://localhost:3000/posts", data).pipe(map((res: any) => {
      return res;
    }))
  }


  //get by id

  get(id: string) {
    console.log("id = " + id);
    console.log("id = " + JSON.stringify("http://localhost:3000/posts?email=" + id));
    console.log("url = " + "http://localhost:3000/posts?email=" + id);
    var url = new URL("http://localhost:3000/posts");
    url.searchParams.set("email", id);
    let finalUrl = url.toString().replace('%22', '').replace('%40', '@').replace('%22', '');
    console.log("url cleans  = " + finalUrl);
    return this.http.get<any>(finalUrl).pipe(map((res: any) => {
      //console.log("form api res= " + res);
      return res;
    }))
  }
  //id = email
  updateUserInfo(data: any, id: string) {
    console.log("api update data = " + JSON.stringify(data));
    console.log("url = " + "http://localhost:3000/posts/" + id);
    return this.http.put<any>("http://localhost:3000/posts/" + id, data).pipe(map((res: any) => {
      console.log("apiUser" + JSON.stringify(res));
      return res;
    }))
  }
}
