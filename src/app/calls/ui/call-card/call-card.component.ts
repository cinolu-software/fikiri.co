import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ICall } from '../../../shared/utils/types/models.type';
import { RouterModule } from '@angular/router';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-call-card',
  imports: [CardModule, ButtonModule, NgOptimizedImage, RouterModule, ApiImgPipe, CommonModule],
  templateUrl: './call-card.component.html'
})
export class CallCardComponent {
  call = input.required<ICall>();
}
