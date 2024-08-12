import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { SolutionStoreInterface } from './types/solution-store.interface';
import { SolutionStore } from './data-access/solution.store';
import { SolutionService } from './data-access/solution.service';
import { environment } from '../../../environments/environment';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { ConvertToLowercasePipe } from '../../shared/pipes/convert-to-lowercase.pipe';
import { IImage, IUser } from '../../shared/types/models.interfaces';
import { SpinnerComponent } from '../../shared/ui/spinner/spinner.component';
import { NotFoundComponent } from '../not-found/not-found.component';

@Component({
  selector: 'app-solution',
  standalone: true,
  providers: [SolutionService, SolutionStore],
  templateUrl: './solution.component.html',
  imports: [
    NgOptimizedImage,
    CommonModule,
    RouterLink,
    NotFoundComponent,
    SpinnerComponent,
    PaginationComponent,
    ConvertToLowercasePipe
  ]
})
export class SolutionComponent implements OnInit {
  vm$: Observable<{ solutionStore: SolutionStoreInterface; user: IUser | null }>;
  currentImageIndex = 0;

  constructor(private store: SolutionStore, private route: ActivatedRoute, private router: Router) {
    this.vm$ = this.store.vm$;
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.load(id);
  }

  displayImage(image: IImage): string {
    return `${environment.apiUrl}uploads/solutions/${image.image_link}`;
  }

  nextImage(images: IImage[]): void {
    if (this.currentImageIndex < images.length - 1) this.currentImageIndex++;
  }

  prevImage(): void {
    if (this.currentImageIndex > 0) this.currentImageIndex--;
  }

  load(id: number | undefined | null): void {
    if (!id) return;
    this.router.navigate(['/solutions', id]);
    this.store.getSolution(id);
  }
}
