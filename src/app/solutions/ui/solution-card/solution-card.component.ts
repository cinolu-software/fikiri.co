import { Component, input } from '@angular/core';
import { CommonModule, DatePipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { ISolution } from '../../../shared/utils/types/models.type';

@Component({
  selector: 'app-solution-card',
  imports: [NgOptimizedImage, RouterLink, DatePipe, ApiImgPipe, CommonModule],
  templateUrl: './solution-card.component.html'
})
export class SolutionCardComponent {
  solution = input.required<ISolution>();
}
