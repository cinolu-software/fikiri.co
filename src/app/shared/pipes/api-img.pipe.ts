import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

type ApiImageData = Record<string, string>;

@Pipe({
  name: 'apiIMG'
})
export class ApiImgPipe implements PipeTransform {
  transform(value: ApiImageData, key: string): string {
    const apiUrl = environment.apiUrl;
    const images: Record<string, string> = {
      user: value['profile']
        ? `${apiUrl}uploads/profiles/${value['profile']}`
        : value['google_image'] || '/images/avatar.webp',
      solution: value['image'] ? `${apiUrl}uploads/solutions/${value['image']}` : '/images/no-img.png',
      call: value['image'] ? `${apiUrl}uploads/uploads/calls/covers/${value['image']}` : '/images/no-img.png'
    };
    return images[key];
  }
}
