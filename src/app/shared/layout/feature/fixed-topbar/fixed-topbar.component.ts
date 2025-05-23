import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../../ui/topbar/topbar.component';

@Component({
  selector: 'app-fixed-topbar-layout',
  templateUrl: './fixed-topbar.component.html',
  imports: [RouterOutlet, TopbarComponent]
})
export class fixedTopbarLayoutLayoutComponent {}
