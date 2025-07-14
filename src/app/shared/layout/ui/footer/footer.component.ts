import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { CONTACT_LINKS, EXPLORATION_LINKS, SOCIAL_LINKS } from '../../utils/data/links';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  links = [
    { title: 'Parcourir', urls: EXPLORATION_LINKS },
    { title: 'Contact', urls: CONTACT_LINKS },
    { title: 'Socials', urls: SOCIAL_LINKS },
  ];

  getYear(): number {
    return new Date().getFullYear();
  }
}
