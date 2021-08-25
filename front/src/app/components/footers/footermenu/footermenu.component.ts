import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-footermenu",
  templateUrl: "./footermenu.component.html",
})
export class FooterMenuComponent implements OnInit {
  date = new Date().getFullYear();
  constructor() {}

  ngOnInit(): void {}
}
