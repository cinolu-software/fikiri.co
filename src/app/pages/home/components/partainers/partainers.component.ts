import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-partainers',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './partainers.component.html'
})
export class PartainersComponent {
  partainers = [
    {
      id: 1,
      name: 'ingenious city',
      src: '/images/partainers/1.png'
    },
    {
      id: 2,
      name: 'Un jour nouveau',
      src: '/images/partainers/2.png'
    },
    {
      id: 3,
      name: 'waza',
      src: '/images/partainers/3.png'
    },
    {
      id: 4,
      name: 'ukamili',
      src: '/images/partainers/4.png'
    },
    {
      id: 5,
      name: 'kadea',
      src: '/images/partainers/5.png'
    },
    {
      id: 6,
      name: 'ikiotahub',
      src: '/images/partainers/6.png'
    },
    {
      id: 7,
      name: 'work space',
      src: '/images/partainers/7.png'
    },
    {
      id: 8,
      name: 'kivuTech',
      src: '/images/partainers/8.png'
    },
    {
      id: 9,
      name: 'akili',
      src: '/images/partainers/9.png'
    },
    {
      id: 10,
      name: 'innovation hub',
      src: '/images/partainers/10.png'
    },
    {
      id: 11,
      name: 'habariRDC',
      src: '/images/partainers/11.png'
    },
    {
      id: 12,
      name: 'creationHub',
      src: '/images/partainers/12.png'
    },
    {
      id: 13,
      name: 'sadek',
      src: '/images/partainers/13.png'
    },
    {
      id: 14,
      name: 'base',
      src: '/images/partainers/14.png'
    },
    {
      id: 15,
      name: 'luba hub',
      src: '/images/partainers/15.png'
    },
    {
      id: 16,
      name: 'yPardRDC',
      src: '/images/partainers/16.png'
    }
  ];
}
