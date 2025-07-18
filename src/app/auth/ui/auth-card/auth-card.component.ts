import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';

@Component({
  selector: 'app-auth-card',
  imports: [RouterModule, LucideAngularModule],
  templateUrl: './auth-card.component.html',
})
export class AuthCardComponent {
  icons = {
    back: ArrowLeft,
  };
}
