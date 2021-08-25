import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";


// components for views and layouts

import { AdminNavbarComponent } from "./components/navbars/admin-navbar/admin-navbar.component";
import { AuthNavbarComponent } from "./components/navbars/auth-navbar/auth-navbar.component";
import { FooterAdminComponent } from "./components/footers/footer-admin/footer-admin.component";
import { FooterMenuComponent } from "./components/footers/footermenu/footermenu.component";
import { FooterComponent } from "./components/footers/footer/footer.component";
import { FooterSmallComponent } from "./components/footers/footer-small/footer-small.component";
import { IndexNavbarComponent } from "./components/navbars/index-navbar/index-navbar.component";
import { MapExampleComponent } from "./components/maps/map-example/map-example.component";
import { IndexDropdownComponent } from "./components/dropdowns/index-dropdown/index-dropdown.component";
import { TiDropdownComponent } from "./components/dropdowns/ti-dropdown/ti-dropdown.component";
import { TableDropdownComponent } from "./components/dropdowns/table-dropdown/table-dropdown.component";
import { TableMenuDropdownComponent } from "./components/dropdowns/table-menu-dropdown/table-menu-dropdown.component";
import { PagesDropdownComponent } from "./components/dropdowns/pages-dropdown/pages-dropdown.component";
import { NotificationDropdownComponent } from "./components/dropdowns/notification-dropdown/notification-dropdown.component";
import { UserDropdownComponent } from "./components/dropdowns/user-dropdown/user-dropdown.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { DashboardBaseComponent } from "./views/admin-university/dashboard/dashboard-base.component";
import { SidebarBaseComponent } from "./components/sidebar-base/sidebar-base.component";
import { AdminBaseComponent } from "./layouts/admin-base/admin-base.component";
import { FuelComponent } from "./views/admin-university/fuel/fuel.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { CardAddGroupComponent } from "./views/card-addgroup/card-addgroup.component";
import { HeaderStatsBaseComponent } from "./components/headers/header-stats-base/header-stats-base.component";
import { TableDropdownCarComponent } from "./components/dropdowns/table-dropdown-car/table-dropdown-car.component";
import { CarComponent } from "./views/admin-university/car/car.component";
import { EstadoComponent } from "./views/admin-university/estado/estado.component";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VehiculoComponent } from "./views/admin-university/vehiculo/vehiculo.component";
import { ModalModule } from "ngb-modal";
import { NgbAlertModule, NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPageScrollCoreModule } from "ngx-page-scroll-core";
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { OrderModule } from "ngx-order-pipe";
import { CookieService } from "ngx-cookie-service";


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true };


@NgModule({
  declarations: [
    AppComponent,
    IndexDropdownComponent,
    TiDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    TableDropdownCarComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    FooterComponent,
    FooterSmallComponent,
    FooterAdminComponent,
    HeaderStatsBaseComponent,
    MapExampleComponent,
    AuthNavbarComponent,
    AdminNavbarComponent,
    IndexNavbarComponent,
    FooterMenuComponent,
    TableMenuDropdownComponent,
    TableDropdownComponent,
    EstadoComponent,
    CarComponent,
    CardAddGroupComponent,
    DashboardBaseComponent,
    SidebarBaseComponent,
    VehiculoComponent,
    FuelComponent,
    AdminBaseComponent,
    //-------End Base-------------------
    
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,
            FormsModule, NgSelectModule, BrowserAnimationsModule,
            NgbModule,NgbAlertModule,ModalModule,NgbModalModule,
            NgxPageScrollCoreModule, PerfectScrollbarModule, OrderModule,
            ToastrModule.forRoot()],
  providers: [CookieService,{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
