import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { sdgs } from '../../utils/data/sdgs';
import { RouterModule } from '@angular/router';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-sdgs',
  imports: [NgIcon, RouterModule, NgOptimizedImage],
  templateUrl: './sdgs.component.html'
})
export class SdgsComponent {
  sdgs = sdgs;
}
