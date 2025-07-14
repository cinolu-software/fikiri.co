import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardMenuComponent } from '../../ui/dashboard-menu/dashboard-menu.component';
import { DashboardSidebarComponent } from '../../ui/sidebar/dashboard-sidebar.component';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  imports: [RouterOutlet, DashboardMenuComponent, DashboardSidebarComponent],
})
export class DashboardLayoutComponent {}
