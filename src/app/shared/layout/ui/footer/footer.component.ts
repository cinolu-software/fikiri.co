import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { contactLinks, EXPLORATION_LINKS, socialLinks } from '../../utils/data/links';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  links = [
    { title: 'Parcourir', urls: EXPLORATION_LINKS },
    { title: 'Contact', urls: contactLinks },
    { title: 'Socials', urls: socialLinks }
  ];

  getYear(): number {
    return new Date().getFullYear();
  }
}
