import { Component } from '@angular/core';
import { EmprendedorNavComponent } from '../emprendedor-nav.component';

interface NewsItem {
  id: number;
  title: string;
  type: string;
  date: string;
  location: string;
  status: 'Pendiente' | 'Nuevo' | 'Proximo';
  description: string;
  cta: string;
  tags: string[];
}

@Component({
  selector: 'app-emprendedor-noticias',
  standalone: true,
  imports: [EmprendedorNavComponent],
  templateUrl: './emprendedor-noticias.component.html',
  styleUrl: './emprendedor-noticias.component.css',
})
export class EmprendedorNoticiasComponent {
  readonly news: NewsItem[] = [
    {
      id: 1,
      title: 'Taller 10R: Reusar',
      type: 'Capacitacion',
      date: '22 May 2026',
      location: 'UMSS Aula Verde',
      status: 'Pendiente',
      description: 'Aprende a reducir costos con practicas circulares aplicadas a tu producto.',
      cta: 'Reservar cupo',
      tags: ['10R', 'Circularidad'],
    },
    {
      id: 2,
      title: 'Feria Ecoimpulso Centro',
      type: 'Feria',
      date: '31 May 2026',
      location: 'Plaza Colon',
      status: 'Nuevo',
      description: 'Espacio para exhibir productos con alto impacto comunitario.',
      cta: 'Postular stand',
      tags: ['Ventas', 'Comunidad'],
    },
    {
      id: 3,
      title: 'Mentoria de costos y precios',
      type: 'Capacitacion',
      date: '06 Jun 2026',
      location: 'Zoom',
      status: 'Proximo',
      description: 'Define tu margen sostenible y costos reales en tu negocio.',
      cta: 'Inscribirme',
      tags: ['Finanzas', 'Precios'],
    },
    {
      id: 4,
      title: 'Clinica legal y NIT',
      type: 'Capacitacion',
      date: '10 Jun 2026',
      location: 'Virtual',
      status: 'Pendiente',
      description: 'Asesoria basica sobre requisitos legales y opciones de formalizacion.',
      cta: 'Agendar llamada',
      tags: ['Legal', 'Formalizacion'],
    },
    {
      id: 5,
      title: 'Laboratorio de empaques',
      type: 'Taller',
      date: '12 Jun 2026',
      location: 'Lab Tecno Social',
      status: 'Nuevo',
      description: 'Diseña empaques con materiales locales y menores residuos.',
      cta: 'Participar',
      tags: ['Packaging', 'Diseno'],
    },
    {
      id: 6,
      title: 'Sesion de foto producto',
      type: 'Capacitacion',
      date: '18 Jun 2026',
      location: 'Meet',
      status: 'Proximo',
      description: 'Fotografia accesible para mejorar tu catalogo digital.',
      cta: 'Ver detalles',
      tags: ['Marketing', 'Foto'],
    },
    {
      id: 7,
      title: 'Feria de invierno sostenible',
      type: 'Feria',
      date: '02 Jul 2026',
      location: 'Parque Mariscal',
      status: 'Proximo',
      description: 'Convocatoria abierta para productos de temporada.',
      cta: 'Aplicar',
      tags: ['Ventas', 'Temporada'],
    },
    {
      id: 8,
      title: 'Ciclo de bienestar y cuidados',
      type: 'Evento',
      date: '05 Jul 2026',
      location: 'Gaia Pacha',
      status: 'Pendiente',
      description: 'Herramientas para balancear trabajo y cuidados en tu emprendimiento.',
      cta: 'Confirmar',
      tags: ['Cuidado', 'Comunidad'],
    },
    {
      id: 9,
      title: 'Red de proveedores locales',
      type: 'Evento',
      date: '09 Jul 2026',
      location: 'Cochabamba',
      status: 'Nuevo',
      description: 'Conecta con insumos sostenibles y aliados regionales.',
      cta: 'Unirme',
      tags: ['Alianzas', 'Impacto'],
    },
    {
      id: 10,
      title: 'Ruta de capacitaciones Q3',
      type: 'Capacitacion',
      date: '15 Jul 2026',
      location: 'Virtual',
      status: 'Proximo',
      description: 'Calendario trimestral de formacion para emprendedores verdes.',
      cta: 'Ver calendario',
      tags: ['Planificacion', 'Formacion'],
    },
  ];

  statusClass(status: NewsItem['status']): string {
    return `status-${status.toLowerCase()}`;
  }
}
