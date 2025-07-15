import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  input,
  NgZone,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { AuthStore } from '../../store/auth.store';
import { DesktopDashboardMenuComponent } from './desktop-menu/desktop-dashboard-menu.component';
import { MobileDashboardMenuComponent } from './mobile-menu/mobile-dashboard.component';
import { PROFILE_LINKS } from '../../utils/data/links';

@Component({
  selector: 'app-dashboard-menu',
  imports: [CommonModule, NgOptimizedImage, DesktopDashboardMenuComponent, MobileDashboardMenuComponent],
  templateUrl: './dashboard-menu.component.html',
})
export class DashboardMenuComponent implements OnDestroy {
  #elementRef = inject(ElementRef);
  isFixed = signal(false);
  links = signal(PROFILE_LINKS);
  fixed = input(false);
  mobileNav = viewChild(MobileDashboardMenuComponent);
  desktopNav = viewChild(DesktopDashboardMenuComponent);
  #destroy$ = new Subject<void>();
  #ngZone = inject(NgZone);
  authStore = inject(AuthStore);

  constructor() {
    afterNextRender(() => {
      this.#ngZone.runOutsideAngular(() => {
        this.setupEventListeners();
      });
    });
  }

  signOut(): void {
    this.authStore.signOut();
  }

  closeNav(): void {
    this.desktopNav()?.closeNav();
    this.mobileNav()?.closeNav();
  }

  setupEventListeners(): void {
    const click$ = fromEvent(document, 'click');
    const scroll$ = fromEvent(window, 'scroll');
    click$.pipe(takeUntil(this.#destroy$)).subscribe((event: Event) => {
      const isInside = this.#elementRef.nativeElement.contains(event.target);
      const isMenuOpen = this.desktopNav()?.activeTab() || this.mobileNav()?.isOpen();
      if (isMenuOpen && !isInside) this.closeNav();
    });
    scroll$.pipe(takeUntil(this.#destroy$)).subscribe(() => {
      const shouldFix = window.scrollY > 20;
      if (this.isFixed() !== shouldFix) this.isFixed.set(shouldFix);
      if (this.desktopNav()?.activeTab() || this.mobileNav()?.isOpen()) this.closeNav();
    });
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }
}
