import { ILink } from '../types/link.type';
import {
  Home,
  Blend,
  Info,
  ChartNoAxesColumn,
  LayoutGrid,
  Settings,
  PhoneCall,
  UserCheck,
  Telescope,
} from 'lucide-angular';

export const PROFILE_LINKS = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    exactUrl: true,
    icon: LayoutGrid,
  },
  {
    name: 'Mon compte',
    exactUrl: true,
    path: '/dashboard/account',
    icon: Settings,
  },
  {
    name: 'Utilisateurs',
    exactUrl: false,
    path: '/dashboard/users',
    icon: UserCheck,
  },
  {
    name: 'Appels',
    exactUrl: false,
    path: '/dashboard/calls',
    icon: PhoneCall,
  },
  {
    name: 'Solutions',
    exactUrl: false,
    path: '/dashboard/solutions',
    icon: Blend,
  },
  {
    name: 'Vulgarisateurs',
    exactUrl: false,
    path: '/dashboard/outreachers',
    icon: Telescope,
  },
];

export const EXPLORATION_LINKS: ILink[] = [
  {
    name: 'Accueil',
    path: '/',
    description: 'Découvez la plateforme',
    icon: Home,
    exactUrl: true,
  },
  {
    name: 'Solutions',
    path: '/solutions',
    description: 'Voir les solutions',
    icon: Blend,
    exactUrl: true,
  },
  {
    name: 'A propos',
    path: '/',
    fragment: 'about',
    description: 'A propos de nous',
    icon: Info,
    exactUrl: false,
  },
  {
    name: 'Mission',
    path: '/',
    fragment: 'mission',
    description: 'Voir notre mission',
    icon: ChartNoAxesColumn,
    exactUrl: false,
  },
];

export const CONTACT_LINKS: ILink[] = [
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

export const SOCIAL_LINKS: ILink[] = [
  { name: 'Facebook', path: 'https://www.facebook.com/fikiriSDG?mibextid=ViGcVu', external: true },
  {
    name: 'Instagram',
    path: 'https://www.instagram.com/fikirisdg/?fbclid=IwAR32B-_YEZzAz-9K35Ee7xH1dvHKz1aeMprDZix8QG-DXQODqgVC8xK2pYw',
    external: true,
  },
  { name: 'LinkedIn', path: 'https://www.linkedin.com/showcase/fikiri', external: true },
];
