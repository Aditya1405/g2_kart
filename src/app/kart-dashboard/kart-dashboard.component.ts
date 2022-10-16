import { Component, OnInit } from '@angular/core';

import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-kart-dashboard',
  templateUrl: './kart-dashboard.component.html',
  styleUrls: ['./kart-dashboard.component.css']
})
export class KartDashboardComponent implements OnInit {
  constructor(private viewportScroller: ViewportScroller) {

  }
  ngOnInit(): void {
    console.log("ng on init = AppComponent");

  }
  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

}
