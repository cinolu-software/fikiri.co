import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

export type ImageSourceObject = Record<string, string>;
export interface ImageValue {
  profile: string;
  google_image: string;
  image: string;
}

@Pipe({
  name: 'apiIMG',
})
export class ApiImgPipe implements PipeTransform {
  #defaultImages: ImageSourceObject = {
    user: '/images/avatar.webp',
    solution: '/images/no-img.png',
    call: '/images/no-img.png',
    default: '/images/no-img.png',
  };
  #imagePaths: ImageSourceObject = {
    user: 'uploads/profiles/',
    solution: 'uploads/solutions/',
    call: 'uploads/calls/covers/',
  };
  transform(value: unknown, key: string): string {
    if (!value) return this.#defaultImages[key] || this.#defaultImages['default'];
    const apiUrl = environment.apiUrl;
    const typedValue = value as ImageValue;
    switch (key) {
      case 'user':
        return typedValue['profile']
          ? `${apiUrl}${this.#imagePaths['user']}${typedValue['profile']}`
          : typedValue['google_image'] || this.#defaultImages['user'];
      case 'solution':
        return typedValue['image']
          ? `${apiUrl}${this.#imagePaths['solution']}${typedValue['image']}`
          : this.#defaultImages['solution'];
      case 'call':
        return typedValue['image']
          ? `${apiUrl}${this.#imagePaths['call']}${typedValue['image']}`
          : this.#defaultImages['call'];
      default:
        return this.#defaultImages['default'];
    }
  }
}
