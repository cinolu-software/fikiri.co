import { Component, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SolutionSkeletonComponent } from '../../ui/solution-skeleton/solution-skeleton.component';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { OrderJSONPipe } from '../../../shared/pipes/order-json.pipe';
import { SolutionStore } from '../../data-access/solution.store';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  providers: [SolutionStore],
  imports: [CommonModule, ApiImgPipe, OrderJSONPipe, NgOptimizedImage, SolutionSkeletonComponent],
})
export class SolutionComponent {
  orderedResponses = signal<string[]>([
    'Nom de la solution',
    'Description',
    'Problème ciblé ',
    'Thématique',
    'Lien de la vidéo',
  ]);
  store = inject(SolutionStore);

  checkLink(link: string): boolean {
    return link?.includes('http') || link?.includes('https');
  }
}
