import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-solution-card-skeleton',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './solution-card-skeleton.component.html'
})
export class SolutionCardSkeletonComponent {}
