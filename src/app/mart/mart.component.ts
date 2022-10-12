import { Component, OnInit } from '@angular/core';
import { MartModel } from '../martDataModel';
import { MartApiService } from '../shared/mart-api.service';

@Component({
  selector: 'app-mart',
  templateUrl: './mart.component.html',
  styleUrls: ['./mart.component.css']
})
export class MartComponent implements OnInit {
  newQty: number = 0;

  martDataModel: MartModel = new MartModel();
  constructor(private martApi: MartApiService) { }

  ngOnInit(): void {
    this.get();
  }
  get() {
    this.martApi.get().subscribe({
      next: (v) => {
        this.martDataModel = v[0];
        console.log("success= ");
      },
      error: (e) => console.error("failed"),
      complete: () => console.info('complete')
    })
  }
  update(id: number) {
    //check if curr item > 0

    if (this.martDataModel.qty > 0) {
      this.newQty++;
      this.martDataModel.qty--;
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
}
