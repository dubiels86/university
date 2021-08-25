import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin-base",
  templateUrl: "./admin-base.component.html",
})
export class AdminBaseComponent implements OnInit {
  statTitle = "3344"
  title = 'Home'
  constructor() {}

  ngOnInit(): void {}
}
