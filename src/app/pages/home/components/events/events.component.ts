import { Component, OnInit } from '@angular/core';
import { eventsStore } from './data-access/events.store';
import { Observable } from 'rxjs';
import { EventsStoreInterface } from './types/events-store.interface';
import { AsyncPipe, DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage, SlicePipe } from '@angular/common';
import { environment } from '../../../../../environments/environment';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { IImage } from '../../../../shared/types/models.interfaces';

@Component({
  selector: 'app-calls',
  standalone: true,
  providers: [eventsStore],
  templateUrl: './events.component.html',
  imports: [NgIf, AsyncPipe, SlicePipe, NgForOf, DatePipe, NgClass, NgOptimizedImage, PaginationComponent]
})
export class EventsComponent implements OnInit {
  currentImageIndex = 0;
  vm$: Observable<EventsStoreInterface>;

  constructor(private store: eventsStore) {
    this.vm$ = this.store.vm$;
  }

  ngOnInit(): void {
    this.store.getEvents();
  }

  displayImage(image: IImage): string {
    return `${environment.apiUrl}uploads/events/${image.image_link}`;
  }

  nextImage(images: IImage[]): void {
    if (this.currentImageIndex < images.length - 1) this.currentImageIndex++;
  }

  prevImage(): void {
    if (this.currentImageIndex > 0) this.currentImageIndex--;
  }
}
