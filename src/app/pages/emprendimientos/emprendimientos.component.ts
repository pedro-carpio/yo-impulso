import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SupabaseService, Entrepreneurship } from '../../services/supabase.service';
import { SearchService } from '../../services/search.service';

const MOCK_ENTREPRENEURSHIPS: Entrepreneurship[] = [
  {
    PK_entrepreneurship: 1, FK_category: 1,
    businessName: 'Ampuy',
    description: 'AMPUY es un emprendimiento de triple impacto que encuentra en el turismo su principal actividad y motor de desarrollo. Diseñamos experiencias transformadoras de turismo extranjero en Bolivia con enfoque en educación, investigación científica, servicio comunitario y sostenibilidad.',
    locationType: 'Virtual',
    mainImage: 'assets/emprendimientos/ampuy.webp',
    isVirtual: true, isActive: true,
    tbmarketplacecategories: { category: 'Turismo' },
  },
  {
    PK_entrepreneurship: 2, FK_category: 1,
    businessName: 'Alma de Rosa',
    description: 'ALMA DE ROSA transforma rosas cultivadas orgánicamente en exquisitas mermeladas, jarabes artesanales, limonadas florales y elegantes arreglos que celebran la belleza y el sabor de lo natural.',
    locationType: 'Casa',
    mainImage: 'assets/emprendimientos/alma-de-rosa.jpeg',
    isVirtual: false, isActive: true,
    tbmarketplacecategories: { category: 'Alimentos' },
  },
  {
    PK_entrepreneurship: 3, FK_category: 4,
    businessName: 'Aloe Leben',
    description: 'Aloe Leben es un emprendimiento dedicado a la producción agroecológica del Aloe Vera. Desde el cultivo orgánico hasta la elaboración artesanal, promueve un ciclo sostenible que da origen a productos naturales para el cuidado de la piel.',
    locationType: 'Tienda',
    mainImage: 'assets/emprendimientos/aloe-leben.jpg',
    isVirtual: false, isActive: true,
    tbmarketplacecategories: { category: 'Cosmética' },
  },
  {
    PK_entrepreneurship: 4, FK_category: 1,
    businessName: 'Amaria',
    description: 'Elaboración de productos libres de glúten, sin aditivos y sin conservantes a base de grano de Amaranto, un super alimento de alto valor nutricional para la salud.',
    locationType: 'Tienda',
    mainImage: 'assets/emprendimientos/conocete.jpg',
    isVirtual: false, isActive: true,
    tbmarketplacecategories: { category: 'Alimentos' },
  },
  {
    PK_entrepreneurship: 5, FK_category: 1,
    businessName: 'Botánica Ancestral',
    description: 'Bebidas orgánicas a base de cúrcuma y jengibre con beneficios para la salud y el bienestar general. Negocios virtual con entregas coordinadas mediante delivery.',
    locationType: 'Virtual',
    mainImage: 'assets/emprendimientos/botanica-ancestral.jpg',
    isVirtual: true, isActive: true,
    tbmarketplacecategories: { category: 'Alimentos' },
  },
  {
    PK_entrepreneurship: 6, FK_category: 2,
    businessName: 'Colorina by Pao',
    description: 'Piedras pintadas y artesanías con troncos naturales para decoración de hogar u oficinas. Realiza entregas a domicilio y hace pedidos personalizados.',
    locationType: 'Virtual',
    mainImage: 'assets/emprendimientos/colorina.png',
    isVirtual: true, isActive: true,
    tbmarketplacecategories: { category: 'Artesanías' },
  },
  {
    PK_entrepreneurship: 7, FK_category: 2,
    businessName: 'MACARENA',
    description: 'Marca Boliviana de accesorios. Desarrollando una línea eco con la que utilizaremos residuos para poder sacar artículos para el hogar.',
    locationType: 'Virtual',
    mainImage: 'assets/emprendimientos/macarena.png',
    isVirtual: true, isActive: true,
    tbmarketplacecategories: { category: 'Bisutería' },
  },
  {
    PK_entrepreneurship: 8, FK_category: 2,
    businessName: 'ECOFRIENDLY',
    description: 'ECOFRIENDLY es un emprendimiento sostenible que transforma residuos en productos útiles, naturales y respetuosos con el medio ambiente. Jabones desengrasantes, velas artesanales y jabones naturales de arroz.',
    locationType: 'Tienda',
    mainImage: 'assets/emprendimientos/ecofriendly.jpeg',
    isVirtual: false, isActive: true,
    tbmarketplacecategories: { category: 'Hogar' },
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
