import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  imports: [RouterOutlet, TopbarComponent, FooterComponent],
})
export class FullLayoutComponent {}
