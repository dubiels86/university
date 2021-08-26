import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./layouts/admin/admin.component";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { GroupComponent } from "./views/group/group.component";



const routes: Routes = [
  
  {
    path: "admin",
    component: AdminComponent,
    
    children: [
      { path: "dashboard", component: DashboardComponent},
      { path: "grupo", component: GroupComponent},
      { path: "", redirectTo: "/admin/dashboard", pathMatch: "full" },
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
