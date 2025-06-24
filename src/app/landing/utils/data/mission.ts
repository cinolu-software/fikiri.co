import { IMission } from '../types/mission.type';
import { ScanSearch, Component, FlaskConical } from 'lucide-angular';

export const MISSIONS: IMission[] = [
  {
    icon: ScanSearch,
    title: 'Identification des solutions',
    description: 'Repérer et analyser des initiatives innovantes répondant aux défis des ODD.',
  },
  {
    icon: Component,
    title: 'Collaboration et synergie',
    description: 'Créer un écosystème dynamique reliant chercheurs, entreprises et institutions.',
  },
  {
    icon: FlaskConical,
    title: 'Expérimentation et validation',
    description: "Tester les solutions innovantes pour en évaluer l'impact et assurer leur viabilité.",
  },
];
