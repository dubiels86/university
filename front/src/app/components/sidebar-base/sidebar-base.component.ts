import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";


@Component({
  selector: "app-sidebar-base",
  templateUrl: "./sidebar-base.component.html",
})
export class SidebarBaseComponent implements OnInit {
  collapseShow = "hidden";
  isAdmin: boolean;
  isLogged: boolean;
  isCar:boolean;
  constructor(
              private _route:Router) {}

  ngOnInit() {
    
  }

  
  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }
}
