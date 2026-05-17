import { Component } from '@angular/core';
import { FundacionNavComponent } from '../fundacion-nav.component';

interface AssistedProfile {
  id: number;
  contactName: string;
  businessName: string;
  phone: string;
  status: 'Pendiente' | 'En progreso' | 'Listo';
  progress: number;
  lastContact: string;
  needs: string[];
}

@Component({
  selector: 'app-fundacion-registro',
  standalone: true,
  imports: [FundacionNavComponent],
  templateUrl: './fundacion-registro.component.html',
  styleUrl: './fundacion-registro.component.css',
})
export class FundacionRegistroComponent {
  readonly profiles: AssistedProfile[] = [
    {
      id: 1,
      contactName: 'Roxana Quispe',
      businessName: 'BioHuertos',
      phone: '70512345',
      status: 'En progreso',
      progress: 65,
      lastContact: 'Ayer',
      needs: ['Foto del producto', 'Descripcion breve'],
    },
    {
      id: 2,
      contactName: 'Lucia Rios',
      businessName: 'Jabones Paraiso',
      phone: '71234567',
      status: 'Pendiente',
      progress: 20,
      lastContact: 'Hace 3 dias',
      needs: ['Datos de ubicacion', 'Precio base'],
    },
    {
      id: 3,
      contactName: 'Marcos Flores',
      businessName: 'Madera Viva',
      phone: '70111222',
      status: 'En progreso',
      progress: 48,
      lastContact: 'Hace 5 dias',
      needs: ['Catalogo inicial', 'Foto de taller'],
    },
    {
      id: 4,
      contactName: 'Ana Suarez',
      businessName: 'Semillas Andinas',
      phone: '78900456',
      status: 'Listo',
      progress: 100,
      lastContact: 'Hace 1 semana',
      needs: ['Validacion final'],
    },
    {
      id: 5,
      contactName: 'Diana Choque',
      businessName: 'Kuyay Textil',
      phone: '76432198',
      status: 'En progreso',
      progress: 72,
      lastContact: 'Hoy',
      needs: ['Historia del emprendimiento'],
    },
    {
      id: 6,
      contactName: 'Carla Rivera',
      businessName: 'Cafe Los Yungas',
      phone: '70345678',
      status: 'Listo',
      progress: 100,
      lastContact: 'Hace 2 dias',
      needs: ['Revision de precios'],
    },
    {
      id: 7,
      contactName: 'Miguel Alanes',
      businessName: 'EcoEmpaques',
      phone: '75678901',
      status: 'Pendiente',
      progress: 30,
      lastContact: 'Hace 4 dias',
      needs: ['Foto de producto', 'Categoria'],
    },
    {
      id: 8,
      contactName: 'Julia Condori',
      businessName: 'ArteNatural',
      phone: '72199887',
      status: 'En progreso',
      progress: 55,
      lastContact: 'Hace 2 dias',
      needs: ['Datos bancarios', 'Nombre comercial'],
    },
    {
      id: 9,
      contactName: 'Sonia Mercado',
      businessName: 'Cacao Natural',
      phone: '79911223',
      status: 'Pendiente',
      progress: 10,
      lastContact: 'Hace 1 semana',
      needs: ['Contacto alterno', 'Descripcion'],
    },
    {
      id: 10,
      contactName: 'Rene Lopez',
      businessName: 'Cosmos Ceramica',
      phone: '73344556',
      status: 'En progreso',
      progress: 62,
      lastContact: 'Ayer',
      needs: ['Foto de proceso', 'Ubicacion exacta'],
    },
  ];

  statusClass(status: AssistedProfile['status']): string {
    return `status-${status.toLowerCase().replace(' ', '-')}`;
  }
}
