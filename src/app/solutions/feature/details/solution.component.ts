import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SolutionSkeletonComponent } from '../../ui/solution-skeleton/solution-skeleton.component';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { OrderJSONPipe } from '../../../shared/pipes/order-json.pipe';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { ISolution } from '../../../shared/utils/types/models.type';
import { SolutionsService } from '../../data-access/solutions.service';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  providers: [SolutionsService],
  imports: [CommonModule, ApiImgPipe, OrderJSONPipe, NgOptimizedImage, SolutionSkeletonComponent]
})
export class SolutionComponent implements OnInit {
  #solutionsService = inject(SolutionsService);
  #activatedRoute = inject(ActivatedRoute);
  solution$: Observable<IAPIResponse<ISolution>> | undefined;
  orderedResponses = signal<string[]>([
    'Nom de la solution',
    'Description',
    'Problème ciblé ',
    'Thématique',
    'Lien de la vidéo'
  ]);

  ngOnInit(): void {
    const id = this.#activatedRoute.snapshot.paramMap.get('id');
    if (!id) return;
    this.solution$ = this.#solutionsService.getSolution(id);
  }

  checkLink(link: string): boolean {
    return link?.includes('http') || link?.includes('https');
  }
}
