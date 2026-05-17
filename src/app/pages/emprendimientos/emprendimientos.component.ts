import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SupabaseService, Entrepreneurship } from '../../services/supabase.service';
import { SearchService } from '../../services/search.service';

const MOCK_ENTREPRENEURSHIPS: Entrepreneurship[] = [
  {
    PK_entrepreneurship: 1, FK_category: 1,
    businessName: 'Apicultura Natural',
    description: 'Produccion artesanal de miel organica y productos derivados de la colmena en el valle cochabambino.',
    locationType: 'Casa',
    mainImage: 'https://placehold.co/600x400/e2ede7/2a6f54?text=Apicultura+Natural',
    isVirtual: false, isActive: true,
    tbmarketplacecategories: { category: 'Alimentos' },
  },
  {
    PK_entrepreneurship: 2, FK_category: 3,
    businessName: 'Textiles Andinos',
    description: 'Tejidos a mano con fibras naturales de alpaca y oveja, elaborados por manos artesanas de la comunidad.',
    locationType: 'Tienda',
    mainImage: 'https://placehold.co/600x400/11221a/a3c6b4?text=Textiles+Andinos',
    isVirtual: false, isActive: true,
    tbmarketplacecategories: { category: 'Textiles' },
  },
  {
    PK_entrepreneurship: 3, FK_category: 1,
    businessName: 'Cacao Natural Bolivia',
    description: 'Procesamos cacao organico del Chapare para crear chocolates, cremas y productos gourmet artesanales.',
    locationType: 'Feria',
    mainImage: 'https://placehold.co/600x400/d97706/ffffff?text=Cacao+Natural',
    isVirtual: true, isActive: true,
    tbmarketplacecategories: { category: 'Alimentos' },
  },
  {
    PK_entrepreneurship: 4, FK_category: 2,
    businessName: 'EcoEmpaques Bolivia',
    description: 'Fabricamos empaques biodegradables y bolsas de tela como alternativa sostenible al plastico.',
    locationType: 'Virtual',
    mainImage: 'https://placehold.co/600x400/a3c6b4/11221a?text=EcoEmpaques',
    isVirtual: true, isActive: true,
    tbmarketplacecategories: { category: 'Artesanias' },
  },
  {
    PK_entrepreneurship: 5, FK_category: 1,
    businessName: 'Cafe Los Yungas',
    description: 'Cafe de especialidad cultivado a 1800 metros de altura en los Yungas de La Paz, tostado artesanalmente.',
    locationType: 'Tienda',
    mainImage: 'https://placehold.co/600x400/1a3528/f2f7f4?text=Cafe+Los+Yungas',
    isVirtual: false, isActive: true,
    tbmarketplacecategories: { category: 'Alimentos' },
  },
  {
    PK_entrepreneurship: 6, FK_category: 2,
    businessName: 'ArteNatural',
    description: 'Creaciones de cera de abeja, jabones naturales y velas artesanales hechas con ingredientes locales.',
    locationType: 'Casa',
    mainImage: 'https://placehold.co/600x400/c2d1c6/11221a?text=ArteNatural',
    isVirtual: false, isActive: true,
    tbmarketplacecategories: { category: 'Artesanias' },
  },
];

@Component({
  selector: 'app-emprendimientos',
  standalone: true,
  imports: [],
  templateUrl: './emprendimientos.component.html',
  styleUrl: './emprendimientos.component.css',
})
export class EmprendimientosComponent implements OnInit {
  entrepreneurships: Entrepreneurship[] = [];
  searchQuery = '';
  loading = true;

  constructor(
    private supabase: SupabaseService,
    private search: SearchService,
  ) {
    this.search.query$.pipe(takeUntilDestroyed()).subscribe(q => {
      this.searchQuery = q;
    });
  }

  ngOnInit(): void {
    this.supabase.getEntrepreneurships().subscribe(data => {
      this.entrepreneurships = data.length ? data : MOCK_ENTREPRENEURSHIPS;
      this.loading = false;
    });
  }

  get filtered(): Entrepreneurship[] {
    if (!this.searchQuery.trim()) return this.entrepreneurships;
    const q = this.searchQuery.toLowerCase();
    return this.entrepreneurships.filter(e =>
      e.businessName.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.tbmarketplacecategories?.category.toLowerCase().includes(q)
    );
  }

  locationIcon(type?: string): string {
    const icons: Record<string, string> = {
      Casa: '🏠', Tienda: '🏪', Feria: '⛺', Virtual: '🌐', Entrega: '🚚',
    };
    return icons[type ?? ''] ?? '📍';
  }
}
