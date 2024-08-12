import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { HeroStore } from './data-access/hero.store';
import { Observable } from 'rxjs';
import { HeroStoreInterfce } from './types/hero-store.interfce';
import { SpinnerComponent } from '../../../../shared/ui/spinner/spinner.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  providers: [HeroStore],
  templateUrl: './hero.component.html',
  imports: [RouterLink, NgOptimizedImage, NgIf, AsyncPipe, SpinnerComponent]
})
export class HeroComponent implements OnInit {
  vm$: Observable<HeroStoreInterfce>;

  constructor(private store: HeroStore) {
    this.vm$ = this.store.vm$;
  }

  ngOnInit(): void {
    this.store.getTotals();
  }
}
