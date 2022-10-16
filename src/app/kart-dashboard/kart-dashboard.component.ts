import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-kart-dashboard',
  templateUrl: './kart-dashboard.component.html',
  styleUrls: ['./kart-dashboard.component.css']
})
export class KartDashboardComponent implements OnInit {

  images = ["assets/smartphone-20.12.2021.jpg", "assets/moto_razr-1.jpg", "assets/maxresdefault.jpg"].map((n) => `${n}`);

  constructor(private viewportScroller: ViewportScroller) {

  }
  ngOnInit(): void {
    console.log("ng on init = AppComponent");

  }
  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

}
