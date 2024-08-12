import { Component, input } from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ISolution, IUser } from '../../types/models.interfaces';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-solution-card',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, DatePipe],
  templateUrl: './solution-card.component.html'
})
export class SolutionCardComponent {
  solution = input.required<ISolution>();

  displayImage(solution: ISolution): string {
    return `${environment.apiUrl}/uploads/solutions/${solution.images.at(-1)?.image_link}`;
  }

  displayProfileImage(user: IUser): string {
    return `${environment.apiUrl}/uploads/profiles/${user.profile}`;
  }

  splitUsername(user: IUser): string {
    const name = user.name.split(' ');
    return name[0].toLocaleLowerCase() + ' ' + (name[1] ? name[1].toLocaleLowerCase() : '');
  }
}
