import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent {
  readonly tenRs = [
    { n: 'R1', label: 'Rechazar' },
    { n: 'R2', label: 'Reducir' },
    { n: 'R3', label: 'Reusar' },
    { n: 'R4', label: 'Reparar' },
    { n: 'R5', label: 'Renovar' },
    { n: 'R6', label: 'Redisenar' },
    { n: 'R7', label: 'Recuperar' },
    { n: 'R8', label: 'Reciclar' },
    { n: 'R9', label: 'Revalorizar' },
    { n: 'R10', label: 'Regenerar' },
  ];
}
