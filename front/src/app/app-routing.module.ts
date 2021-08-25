import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminBaseComponent } from "./layouts/admin-base/admin-base.component";
import { CarComponent } from "./views/admin-university/car/car.component";

// layouts

import { DashboardBaseComponent } from "./views/admin-university/dashboard/dashboard-base.component";
import { FuelComponent } from "./views/admin-university/fuel/fuel.component";

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
