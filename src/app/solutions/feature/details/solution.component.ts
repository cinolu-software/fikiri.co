import { Component, inject } from '@angular/core';
import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { SolutionSkeletonComponent } from '../../ui/solution-skeleton/solution-skeleton.component';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { SolutionStore } from '../../data-access/solution.store';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  providers: [SolutionStore],
  imports: [CommonModule, LucideAngularModule, ApiImgPipe, NgOptimizedImage, SolutionSkeletonComponent],
})
export class SolutionComponent {
  #location = inject(Location);
  store = inject(SolutionStore);
  icons = { back: ArrowLeft };

  checkLink(link: string): boolean {
    return link?.includes('http') || link?.includes('https');
  }

  back(): void {
    this.#location.back();
  }
}
