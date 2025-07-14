import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { sdgs } from '../../utils/data/sdgs';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, MoveUpRight } from 'lucide-angular';

@Component({
  selector: 'app-sdgs',
  imports: [LucideAngularModule, RouterModule, NgOptimizedImage],
  templateUrl: './sdgs.component.html',
})
export class SdgsComponent {
  sdgs = sdgs;
  icons = {
    moveUpRight: MoveUpRight,
  };
}
