import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";


// components for views and layouts

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from "ngb-modal";
import { NgbAlertModule, NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPageScrollCoreModule } from "ngx-page-scroll-core";
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { OrderModule } from "ngx-order-pipe";
import { CookieService } from "ngx-cookie-service";
import { GroupComponent} from './views/group/group.component';
import { DashboardComponent} from './views/dashboard/dashboard.component';
import { CardLineChartComponent} from './components/card-line-chart/card-line-chart.component';
import { AdminComponent} from './layouts/admin/admin.component';
import { SidebarComponent} from './components/sidebar/sidebar.component';
import { AdminNavbarComponent} from './components/admin-navbar/admin-navbar.component';
import { HeaderStatsComponent} from './components/header-stats/header-stats.component';
import { FooterAdminComponent} from './components/footer-admin/footer-admin.component';
import { NotificationDropdownComponent} from './components/dropdowns/notification-dropdown/notification-dropdown.component';
import { UserDropdownComponent} from './components/dropdowns/user-dropdown/user-dropdown.component';
import { CardStatsComponent} from './components/card-stats/card-stats.component';
import { CardAddGroupComponent} from './components/card-addgroup/card-addgroup.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true };


@NgModule({
  declarations: [
    AppComponent,
    GroupComponent,
    DashboardComponent,
    CardLineChartComponent,
    AdminComponent,
    SidebarComponent,
    AdminNavbarComponent,
    HeaderStatsComponent,
    FooterAdminComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    CardStatsComponent,
    CardAddGroupComponent
    
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
