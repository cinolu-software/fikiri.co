import { Component, inject } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LucideAngularModule, RefreshCcw, Eye, Edit, Trash } from 'lucide-angular';
import { UsersStore } from '../../data-access/users/users.store';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  providers: [UsersStore],
  imports: [
    LucideAngularModule,
    CommonModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    ApiImgPipe,
    AvatarModule,
  ],
})
export class UsersComponent {
  store = inject(UsersStore);
  icons = {
    refresh: RefreshCcw,
    view: Eye,
    edit: Edit,
    trash: Trash,
  };
}
