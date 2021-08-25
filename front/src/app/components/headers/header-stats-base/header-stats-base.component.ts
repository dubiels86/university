import { Component, OnInit } from "@angular/core";
import { FuelService } from "src/app/services/fuel.service";

@Component({
  selector: "app-header-stats-base",
  templateUrl: "./header-stats-base.component.html",
})
export class HeaderStatsBaseComponent implements OnInit {
  fuelAdd = 0;
  fuelRechargued = 0;
  fuelTotal = 0;
  aux: any[] = [];

  constructor(private readonly _fuelService:FuelService) {
    
  }

  ngOnInit(): void {

  
    
  }
}
