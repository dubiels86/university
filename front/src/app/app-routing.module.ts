import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminBaseComponent } from "./layouts/admin-base/admin-base.component";
import { CarComponent } from "./views/admin-base/car/car.component";

// layouts

import { DashboardBaseComponent } from "./views/admin-base/dashboard/dashboard-base.component";
import { FuelComponent } from "./views/admin-base/fuel/fuel.component";

const routes: Routes = [
  
  {
    path: "admin-base",
    component: AdminBaseComponent,
    
    children: [
      { path: "dashboard-base", component: DashboardBaseComponent},
      { path: "", redirectTo: "dashboard-base", pathMatch: "full" },
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
