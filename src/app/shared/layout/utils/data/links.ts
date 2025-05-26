import { ILink } from '../types/link.type';

export const EXPLORATION_LINKS: ILink[] = [
  {
    name: 'Accueil',
    path: '/',
    description: 'Découvez la plateforme',
    icon: 'matHomeOutline',
    exactUrl: true,
  },
  {
    name: 'Solutions',
    path: '/solutions',
    description: 'Voir les solutions',
    icon: 'matPsychologyOutline',
    exactUrl: true,
  },
  {
    name: 'A propos',
    path: '/',
    fragment: 'about',
    description: 'A propos de nous',
    icon: 'matInfoOutline',
    exactUrl: false,
  },
  {
    name: 'Mission',
    path: '/',
    fragment: 'mission',
    description: 'Voir notre mission',
    icon: 'matBarChartOutline',
    exactUrl: false,
  },
];

export const contactLinks: ILink[] = [
  {
    name: 'Email',
    path: 'mailto:support@fikiri.co',
    external: true,
  },
  {
    name: 'Téléphone',
    path: 'tel:+243979265726',
    external: true,
  },
  {
    name: 'Whatsapp',
    path: 'https://api.whatsapp.com/send?phone=+243979265726',
    external: true,
  },
];

export const socialLinks: ILink[] = [
  { name: 'Facebook', path: 'https://www.facebook.com/fikiriSDG?mibextid=ViGcVu', external: true },
  {
    name: 'Instagram',
    path: 'https://www.instagram.com/fikirisdg/?fbclid=IwAR32B-_YEZzAz-9K35Ee7xH1dvHKz1aeMprDZix8QG-DXQODqgVC8xK2pYw',
    external: true,
  },
  { name: 'LinkedIn', path: 'https://www.linkedin.com/showcase/fikiri', external: true },
];
