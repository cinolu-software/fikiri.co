import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../../ui/topbar/topbar.component';
import { FooterComponent } from '../../ui/footer/footer.component';

@Component({
  selector: 'app-fixed-topbar-layout',
  templateUrl: './fixed-layout.component.html',
  imports: [RouterOutlet, FooterComponent, TopbarComponent],
})
export class FixedLayoutComponent {}
