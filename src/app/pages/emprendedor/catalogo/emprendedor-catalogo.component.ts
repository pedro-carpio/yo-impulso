import { Component } from '@angular/core';
import { EmprendedorNavComponent } from '../emprendedor-nav.component';

interface CatalogItem {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'Activo' | 'Borrador' | 'Revision';
  updated: string;
  image: string;
}

@Component({
  selector: 'app-emprendedor-catalogo',
  standalone: true,
  imports: [EmprendedorNavComponent],
  templateUrl: './emprendedor-catalogo.component.html',
  styleUrl: './emprendedor-catalogo.component.css',
})
export class EmprendedorCatalogoComponent {
  readonly items: CatalogItem[] = [
    {
      id: 1,
      name: 'Miel organica 500g',
      category: 'Alimentos',
      price: 85,
      stock: 24,
      status: 'Activo',
      updated: 'Hoy',
      image: 'https://placehold.co/360x260/e2ede7/2a6f54?text=Miel',
    },
    {
      id: 2,
      name: 'Manta tejida andina',
      category: 'Textiles',
      price: 280,
      stock: 10,
      status: 'Activo',
      updated: 'Ayer',
      image: 'https://placehold.co/360x260/11221a/a3c6b4?text=Textil',
    },
    {
      id: 3,
      name: 'Jabon de calendula',
      category: 'Cosmeticos',
      price: 35,
      stock: 40,
      status: 'Activo',
      updated: 'Hace 2 dias',
      image: 'https://placehold.co/360x260/1a3528/f2f7f4?text=Jabon',
    },
    {
      id: 4,
      name: 'Bolsa de yute reutilizable',
      category: 'Artesanias',
      price: 28,
      stock: 60,
      status: 'Activo',
      updated: 'Hace 3 dias',
      image: 'https://placehold.co/360x260/a3c6b4/11221a?text=Yute',
    },
    {
      id: 5,
      name: 'Cafe blend especial 500g',
      category: 'Alimentos',
      price: 140,
      stock: 18,
      status: 'Revision',
      updated: 'Hace 4 dias',
      image: 'https://placehold.co/360x260/2a6f54/ffffff?text=Cafe',
    },
    {
      id: 6,
      name: 'Velas de cera de abeja',
      category: 'Artesanias',
      price: 55,
      stock: 12,
      status: 'Activo',
      updated: 'Hace 4 dias',
      image: 'https://placehold.co/360x260/c2d1c6/11221a?text=Velas',
    },
    {
      id: 7,
      name: 'Set de ceramica artesanal',
      category: 'Artesanias',
      price: 160,
      stock: 6,
      status: 'Borrador',
      updated: 'Hace 1 semana',
      image: 'https://placehold.co/360x260/d97706/ffffff?text=Ceramica',
    },
    {
      id: 8,
      name: 'Kit huerto urbano',
      category: 'Agroecologia',
      price: 90,
      stock: 14,
      status: 'Activo',
      updated: 'Hace 5 dias',
      image: 'https://placehold.co/360x260/2ba891/ffffff?text=Huerto',
    },
    {
      id: 9,
      name: 'Infusion hierbas locales',
      category: 'Alimentos',
      price: 22,
      stock: 30,
      status: 'Revision',
      updated: 'Hace 2 dias',
      image: 'https://placehold.co/360x260/3d5a71/ffffff?text=Infusion',
    },
    {
      id: 10,
      name: 'Kit apicultura familiar',
      category: 'Alimentos',
      price: 200,
      stock: 5,
      status: 'Activo',
      updated: 'Hoy',
      image: 'https://placehold.co/360x260/11221a/f2f7f4?text=Apicultura',
    },
  ];

  statusClass(status: CatalogItem['status']): string {
    return `status-${status.toLowerCase()}`;
  }
}
