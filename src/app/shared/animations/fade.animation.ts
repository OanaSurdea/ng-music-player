import { trigger, transition, style, animate } from '@angular/animations';

export const fadeAnimation = trigger('fade', [
  transition(':enter', [
    style({ transform: 'translateY(-10)', opacity: 0 }),
    animate('300ms ease-in', style({ transform: 'translateY(0)', opacity: 1 })),
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0)', opacity: 1 }),
    animate('300ms ease-out', style({ transform: 'translateY(-10)', opacity: 0 })),
  ]),
]);