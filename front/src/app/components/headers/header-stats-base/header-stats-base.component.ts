import { Component, OnInit } from "@angular/core";


@Component({
  selector: "app-header-stats-base",
  templateUrl: "./header-stats-base.component.html",
})
export class HeaderStatsBaseComponent implements OnInit {
  fuelAdd = 0;
  fuelRechargued = 0;
  fuelTotal = 0;
  aux: any[] = [];

  constructor() {
    
  }

  ngOnInit(): void {

  
    
  }
}
