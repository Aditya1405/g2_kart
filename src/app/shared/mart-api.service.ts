import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MartApiService {
  newQty: number = 0;
  emitNum = new EventEmitter<number>();
  constructor(private http: HttpClient) { }
  get() {
    return this.http.get<any>("http://localhost:3000/items").pipe(map((res: any) => {
      console.log(res[0]);
      return res;
    }))
  }
  update(data: any, id: number) {
    console.log("id= " + id + " data = " + data);

    return this.http.put<any>("http://localhost:3000/items/" + id, data).pipe(map((res: any) => {
      console.log(res[0]);
      return res;
    }))
  }
  updateCartCount() {
    this.emitNum.emit(++this.newQty);
  }
}
