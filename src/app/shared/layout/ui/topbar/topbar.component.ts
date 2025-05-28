import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  NgZone,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ILink } from '../../utils/types/link.type';
import { AuthService } from '../../../../auth/data-access/auth.service';
import { IAPIResponse } from '../../../services/api/types/api-response.type';
import { EXPLORATION_LINKS } from '../../utils/data/links';
import { DesktopNavComponent } from './desktop-nav/desktop-nav.component';
import { MobileNavComponent } from './mobile-nav/mobile-nav.component';
import { RouterLink } from '@angular/router';
import { selectUser } from '../../../store/auth/auth.reducers';
import { IUser } from '../../../utils/types/models.type';

@Component({
  selector: 'app-topbar',
  imports: [CommonModule, RouterLink, MobileNavComponent, DesktopNavComponent],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent implements OnInit, AfterViewInit, OnDestroy {
  #store = inject(Store);
  #authService = inject(AuthService);
  #zone = inject(NgZone);
  elementRef = inject(ElementRef);
  user$: Observable<IUser | null> | undefined;
  logout$: Observable<IAPIResponse<void>> | undefined;
  tabs = signal<string[]>(['Parcourir']);
  isFixed = signal<boolean>(false);
  fixed = input<boolean>(false);
  mobileNav = viewChild(MobileNavComponent);
  desktopNav = viewChild(DesktopNavComponent);
  #unSubscribe = new Subject<void>();
  #removeListeners: (() => void)[] = [];
  links = signal<Record<string, ILink[]>>({
    Parcourir: EXPLORATION_LINKS,
  });

  ngOnInit(): void {
    this.user$ = this.#store.pipe(select(selectUser));
  }

  ngAfterViewInit(): void {
    this.#zone.runOutsideAngular(() => {
      const onClick = (event: Event) => {
        if (
          (this.desktopNav()?.activeTab() || this.mobileNav()?.isOpen()) &&
          !this.elementRef.nativeElement.contains(event.target)
        ) {
          this.#zone.run(() => this.closeNav());
        }
      };
      const onScroll = () => {
        const shouldBeFixed = window.scrollY > 50;
        if (this.isFixed() !== shouldBeFixed) {
          this.#zone.run(() => this.isFixed.set(shouldBeFixed));
        }
        if (this.desktopNav()?.activeTab() || this.mobileNav()?.isOpen()) {
          this.#zone.run(() => this.closeNav());
        }
      };
      document.addEventListener('click', onClick);
      window.addEventListener('scroll', onScroll);
      this.#removeListeners = [
        () => document.removeEventListener('click', onClick),
        () => window.removeEventListener('scroll', onScroll),
      ];
    });
  }

  signOut(): void {
    this.#authService.signOut().pipe(takeUntil(this.#unSubscribe)).subscribe();
  }

  closeNav(): void {
    this.desktopNav()?.closeNav();
    this.mobileNav()?.closeNav();
  }

  ngOnDestroy(): void {
    this.#unSubscribe.next();
    this.#unSubscribe.complete();
    this.#removeListeners.forEach((fn) => fn());
  }
}
