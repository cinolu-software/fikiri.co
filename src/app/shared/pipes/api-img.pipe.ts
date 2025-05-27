import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'apiIMG',
})
export class ApiImgPipe implements PipeTransform {
  transform(v: unknown, key: string): string {
    const apiUrl = environment.apiUrl;
    const value = v as Record<string, string>;
    const defaultImages: Record<string, string> = {
      user: '/images/avatar-default.webp',
      default: '/images/no-img.png',
    };
    const images: Record<string, string> = {
      user: value['profile']
        ? `${apiUrl}uploads/profiles/${value['profile']}`
        : (value['google_image'] ?? defaultImages['user']),
      solution: value['image'] ? `${apiUrl}uploads/solutions/${value['image']}` : defaultImages['default'],
      call: value['cover'] ? `${apiUrl}uploads/calls/covers/${value['cover']}` : defaultImages['default'],
    };
    return images[key];
  }
}
