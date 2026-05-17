import { Component } from '@angular/core';
import { FundacionNavComponent } from '../fundacion-nav.component';

interface EventItem {
  id: number;
  title: string;
  type: string;
  date: string;
  mode: string;
  location: string;
  capacity: number;
  registered: number;
  status: 'Abierto' | 'En curso' | 'Cerrado' | 'Borrador';
  tags: string[];
}

@Component({
  selector: 'app-fundacion-eventos',
  standalone: true,
  imports: [FundacionNavComponent],
  templateUrl: './fundacion-eventos.component.html',
  styleUrl: './fundacion-eventos.component.css',
})
export class FundacionEventosComponent {
  readonly events: EventItem[] = [
    {
      id: 1,
      title: 'Taller 10R: Reusar',
      type: 'Capacitacion',
      date: '22 May 2026',
      mode: 'Presencial',
      location: 'UMSS Aula Verde',
      capacity: 40,
      registered: 28,
      status: 'Abierto',
      tags: ['10R', 'Circularidad'],
    },
    {
      id: 2,
      title: 'Feria Ecoimpulso Centro',
      type: 'Feria',
      date: '31 May 2026',
      mode: 'Presencial',
      location: 'Plaza Colon',
      capacity: 60,
      registered: 52,
      status: 'En curso',
      tags: ['Ventas', 'Comunidad'],
    },
    {
      id: 3,
      title: 'Mentoria de costos y precios',
      type: 'Capacitacion',
      date: '06 Jun 2026',
      mode: 'Virtual',
      location: 'Zoom',
      capacity: 35,
      registered: 18,
      status: 'Abierto',
      tags: ['Finanzas', 'Precios'],
    },
    {
      id: 4,
      title: 'Laboratorio de empaques',
      type: 'Taller',
      date: '12 Jun 2026',
      mode: 'Presencial',
      location: 'Lab Tecno Social',
      capacity: 25,
      registered: 20,
      status: 'Abierto',
      tags: ['Packaging', 'Diseno'],
    },
    {
      id: 5,
      title: 'Foro de alianzas verdes',
      type: 'Evento',
      date: '20 Jun 2026',
      mode: 'Hibrido',
      location: 'Auditorio Gaia Pacha',
      capacity: 80,
      registered: 61,
      status: 'En curso',
      tags: ['Alianzas', 'Impacto'],
    },
    {
      id: 6,
      title: 'Capacitacion fotografia producto',
      type: 'Capacitacion',
      date: '25 Jun 2026',
      mode: 'Virtual',
      location: 'Meet',
      capacity: 40,
      registered: 15,
      status: 'Abierto',
      tags: ['Marketing', 'Foto'],
    },
    {
      id: 7,
      title: 'Feria de invierno sostenible',
      type: 'Feria',
      date: '02 Jul 2026',
      mode: 'Presencial',
      location: 'Parque Mariscal',
      capacity: 70,
      registered: 40,
      status: 'Abierto',
      tags: ['Ventas', 'Temporada'],
    },
    {
      id: 8,
      title: 'Sesion de onboarding asistido',
      type: 'Taller',
      date: '05 Jul 2026',
      mode: 'Presencial',
      location: 'Centro Kallpa',
      capacity: 20,
      registered: 20,
      status: 'Cerrado',
      tags: ['Registro', 'Acompanamiento'],
    },
    {
      id: 9,
      title: 'Clinica legal y NIT',
      type: 'Capacitacion',
      date: '10 Jul 2026',
      mode: 'Virtual',
      location: 'Zoom',
      capacity: 30,
      registered: 9,
      status: 'Abierto',
      tags: ['Legal', 'Formalizacion'],
    },
    {
      id: 10,
      title: 'Agenda de impacto Q3',
      type: 'Evento',
      date: '15 Jul 2026',
      mode: 'Presencial',
      location: 'Gaia Pacha',
      capacity: 50,
      registered: 0,
      status: 'Borrador',
      tags: ['Planificacion', 'Impacto'],
    },
  ];

  progressPercent(event: EventItem): number {
    if (!event.capacity) return 0;
    return Math.min(100, Math.round((event.registered / event.capacity) * 100));
  }

  statusClass(status: EventItem['status']): string {
    return `status-${status.toLowerCase().replace(' ', '-')}`;
  }
}
