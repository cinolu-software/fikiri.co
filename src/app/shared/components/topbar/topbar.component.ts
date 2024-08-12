import { Component, HostListener, signal, WritableSignal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { authActions } from '../../store/auth/data-access/auth.actions';
import { selectUser as selectAuthUser } from '../../store/auth/data-access/auth.reducers';
import { IUser } from '../../types/models.interfaces';
import { LinkInterface } from './types/link.interface';
import { FormsModule } from '@angular/forms';
import { AppStoreInterface } from '../../types/app-store.interface';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage, FormsModule],
  templateUrl: './topbar.component.html'
})
export class TopbarComponent {
  user$: Observable<IUser | null>;
  isOpen: WritableSignal<boolean> = signal(false);

  constructor(private store: Store<AppStoreInterface>, private router: Router) {
    this.user$ = this.store.pipe(select(selectAuthUser));
  }

  commonLinks: LinkInterface[] = [
    {
      name: 'Accueil',
      path: '/'
    },
    {
      name: 'Solutions',
      path: '/solutions'
    }
  ];

  authLinks: LinkInterface[] = [
    {
      name: 'Se connecter',
      path: '/auth/login'
    },
    {
      name: "S'inscrire",
      path: '/auth/register'
    }
  ];

  unAuthenticatedUserLinks: LinkInterface[] = [...this.commonLinks, ...this.authLinks];

  logOut(): void {
    return this.store.dispatch(authActions.logout());
  }

  trimName(name: string): string {
    return name.length > 15 ? name.substring(0, 15) + '...' : name;
  }

  toogleMenu(): void {
    this.isOpen.update((value) => !value);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const isNavbar = target.closest('.navbar');
    if (!isNavbar) this.isOpen.set(false);
  }
}
