import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SolutionStore } from '../../solution/data-access/solution.store';
import { SolutionStoreInterface } from '../../solution/types/solution-store.interface';
import { ISolution, IUser } from '../../../shared/types/models.interfaces';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe, NgIf, NgOptimizedImage } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { InfoComponent } from '../profile/components/info/info.component';

@Component({
  selector: 'app-edit-solution',
  standalone: true,
  providers: [SolutionStore],
  imports: [NgOptimizedImage, NgIf, AsyncPipe, DatePipe, InfoComponent, RouterLink],
  templateUrl: './edit-solution.component.html'
})
export class EditSolutionComponent implements OnInit {
  vm$: Observable<{ solutionStore: SolutionStoreInterface; user: IUser | null }>;

  constructor(private store: SolutionStore, private route: ActivatedRoute) {
    this.vm$ = this.store.vm$;
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.getSolution(id);
  }

  displayImage(solution: ISolution): string {
    return solution.images.length > 0
      ? `${environment.apiUrl}/uploads/solutions/${solution.images.at(-1)?.image_link}`
      : '/images/default-placeholder.png';
  }

  displayImg(image_link: string | null): string {
    return image_link ? `${environment.apiUrl}/uploads/solutions/${image_link}` : '/images/default-placeholder.png';
  }

  onImageChange(event: Event, solutionId: number): void {
    const fileInput: HTMLInputElement = event.target as HTMLInputElement;
    const file: File | undefined = fileInput.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('thumb', file);
      this.store.uploadImage({ file: formData, solutionId });
    }
  }

  deleteImage(solutionId: number, imageId: number): void {
    const isConfirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette image ?');
    if (isConfirmed) this.store.deleteImage({ solutionId, imageId });
  }
}
