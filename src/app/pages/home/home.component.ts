import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService, MarketplaceCategory, MarketplaceProduct } from '../../services/supabase.service';
import { SearchService } from '../../services/search.service';
import { FilterByCategoryPipe } from '../../pipes/filter-by-category.pipe';

interface ProductWithTags extends MarketplaceProduct {
  sustainabilityTags?: string[];
  tagsByCategory?: { [key: string]: string[] };
}

interface SustainabilityFilter {
  id: string;
  label: string;
  icon: string;
  category: 'environmental' | 'artisanal' | 'material' | 'social';
  color: string;
}

const SUSTAINABILITY_FILTERS: SustainabilityFilter[] = [
  { id: 'plastico-libre', label: 'Libre de plásticos de un solo uso', icon: '🌍', category: 'environmental', color: 'emerald' },
  { id: 'proposito', label: 'Diseño con propósito', icon: '💡', category: 'environmental', color: 'sky' },
  { id: 'ahorro-recursos', label: 'Ahorro de recursos (Agua/Energía)', icon: '💧', category: 'environmental', color: 'blue' },
  { id: 'empaque-biodegradable', label: 'Empaque minimalista o biodegradable', icon: '♻️', category: 'environmental', color: 'green' },

  { id: 'hecho-mano', label: 'Hecho a mano / Con dedicación artesanal', icon: '🤝', category: 'artisanal', color: 'amber' },
  { id: 'upcycling', label: 'Transformado creativamente (Upcycling)', icon: '✨', category: 'artisanal', color: 'orange' },
  { id: 'durabilidad', label: 'Hecho para durar', icon: '⏱️', category: 'artisanal', color: 'rose' },
  { id: 'segunda-mano', label: 'De segunda mano con historia', icon: '📖', category: 'artisanal', color: 'slate' },

  { id: 'material-reciclado', label: 'Hecho de material reciclado', icon: '🔄', category: 'material', color: 'teal' },
  { id: 'sabiduria-ancestral', label: 'Sabiduría ancestral', icon: '🌿', category: 'material', color: 'lime' },
  { id: 'biodegradable', label: 'Biodegradable / Regresa a la tierra', icon: '🌱', category: 'material', color: 'green' },

  { id: 'suelos-responsable', label: 'Responsable con los suelos / Nutre la tierra', icon: '🌾', category: 'social', color: 'amber' },
  { id: 'biodiversidad', label: 'Protector de la biodiversidad', icon: '🦋', category: 'social', color: 'pink' },
  { id: 'impacto-social', label: 'Impacto social positivo / Empleo digno', icon: '🤲', category: 'social', color: 'red' },
  { id: 'cero-residuos', label: 'Cero residuos (Zero Waste)', icon: '🚫', category: 'social', color: 'purple' },
];

const CATALOG_CATEGORIES = [
  { id: 1, name: 'Alimentos', image: 'assets/category/colibri-alimento-final.png' },
  { id: 2, name: 'Aseo', image: 'assets/category/colibri-aseo-final.png' },
  { id: 3, name: 'Papelería', image: 'assets/category/colibri-papeleria-final.png' },
  { id: 4, name: 'Artesanía', image: 'assets/category/colibri-artesania.png' },
  { id: 5, name: 'Pet', image: 'assets/category/colibri-pet.png' },
  { id: 6, name: 'Cuidado', image: 'assets/category/colibri-cuidado.png' },
];

const MOCK_CATEGORIES: MarketplaceCategory[] = [
  { PK_category: 1, category: 'Alimentos' },
  { PK_category: 2, category: 'Artesanias' },
  { PK_category: 3, category: 'Textiles' },
  { PK_category: 4, category: 'Cosmeticos' },
  { PK_category: 5, category: 'Agroecologia' },
  { PK_category: 6, category: 'Joyeria' },
  { PK_category: 7, category: 'Madera' },
  { PK_category: 8, category: 'Servicios' },
];

const MOCK_PRODUCTS: ProductWithTags[] = [
  {
    PK_product: 1, FK_entrepreneurship: 2,
    productName: 'Mermelada de Rosa Artesanal', salePrice: 85, discountPrice: 72,
    mainImage: 'assets/products/alma-de-rosa1.png',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Alma de Rosa' },
    sustainabilityTags: ['hecho-mano', 'biodegradable', 'sabiduria-ancestral'],
  },
  {
    PK_product: 2, FK_entrepreneurship: 3,
    productName: 'Jabón Saponificado Aloe Vera', salePrice: 45, discountPrice: 38,
    mainImage: 'assets/emprendimientos/aloe-leben.jpg',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Aloe Leben' },
    sustainabilityTags: ['hecho-mano', 'sabiduria-ancestral', 'proposito', 'biodiversidad'],
  },
  {
    PK_product: 3, FK_entrepreneurship: 4,
    productName: 'Granola de Amaranto sin Gluten', salePrice: 55,
    mainImage: 'assets/products/conocete1.jpg',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Amaria' },
    sustainabilityTags: ['plastico-libre', 'sabiduria-ancestral', 'proposito'],
  },
  {
    PK_product: 4, FK_entrepreneurship: 5,
    productName: 'Bebida de Cúrcuma y Jengibre Orgánica', salePrice: 35, discountPrice: 28,
    mainImage: 'assets/products/botanica-ancestral1.jpg',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Botánica Ancestral' },
    sustainabilityTags: ['sabiduria-ancestral', 'empaque-biodegradable', 'proposito'],
  },
  {
    PK_product: 5, FK_entrepreneurship: 6,
    productName: 'Piedras Pintadas Decorativas', salePrice: 50, discountPrice: 42,
    mainImage: 'assets/products/colorina1.jpg',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Colorina by Pao' },
    sustainabilityTags: ['hecho-mano', 'upcycling', 'durabilidad'],
  },
  {
    PK_product: 6, FK_entrepreneurship: 7,
    productName: 'Collar Minimalista Macarena', salePrice: 120, discountPrice: 99,
    mainImage: 'assets/products/macarena1.png',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'MACARENA' },
    sustainabilityTags: ['material-reciclado', 'ahorro-recursos', 'proposito'],
  },
  {
    PK_product: 7, FK_entrepreneurship: 8,
    productName: 'Jabón Desengrasante Ecológico', salePrice: 32, discountPrice: 26,
    mainImage: 'assets/products/ecofriendly.jpeg',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'ECOFRIENDLY' },
    sustainabilityTags: ['upcycling', 'cero-residuos', 'proposito', 'empaque-biodegradable'],
  },
  {
    PK_product: 8, FK_entrepreneurship: 1,
    productName: 'Experiencia de Turismo Responsable', salePrice: 250,
    mainImage: 'assets/products/ampuy1.jpeg',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Ampuy' },
    sustainabilityTags: ['impacto-social', 'sabiduria-ancestral', 'biodiversidad'],
  },
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, FilterByCategoryPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  catalogCategories = CATALOG_CATEGORIES;
  sustainabilityFilters = SUSTAINABILITY_FILTERS;
  categories: MarketplaceCategory[] = [];
  products: ProductWithTags[] = [];
  selectedCategory: number | null = null;
  selectedSustainabilityFilters: Set<string> = new Set();
  searchQuery = '';
  loading = true;
  showFilterPanel = false;

  constructor(
    private supabase: SupabaseService,
    private search: SearchService,
  ) {
    this.search.query$.pipe(takeUntilDestroyed()).subscribe(q => {
      this.searchQuery = q;
    });
  }

  ngOnInit(): void {
    this.supabase.getCategories().subscribe(cats => {
      this.categories = cats.length ? cats : MOCK_CATEGORIES;
    });
    this.supabase.getProducts().subscribe(prods => {
      this.products = (prods.length ? prods : MOCK_PRODUCTS) as ProductWithTags[];
      this.loading = false;
    });
  }

  selectCategory(id: number): void {
    this.selectedCategory = this.selectedCategory === id ? null : id;
  }

  toggleSustainabilityFilter(filterId: string): void {
    if (this.selectedSustainabilityFilters.has(filterId)) {
      this.selectedSustainabilityFilters.delete(filterId);
    } else {
      this.selectedSustainabilityFilters.add(filterId);
    }
  }

  toggleFilterPanel(): void {
    this.showFilterPanel = !this.showFilterPanel;
  }

  getFilterLabel(filterId: string): string {
    return SUSTAINABILITY_FILTERS.find(f => f.id === filterId)?.label || '';
  }

  getFilterIcon(filterId: string): string {
    return SUSTAINABILITY_FILTERS.find(f => f.id === filterId)?.icon || '';
  }

  hasActiveFilters(): boolean {
    return this.selectedSustainabilityFilters.size > 0;
  }

  get filteredProducts(): ProductWithTags[] {
    let result = this.products;

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.productName.toLowerCase().includes(q) ||
        p.tbentrepreneurships?.businessName.toLowerCase().includes(q)
      );
    }

    if (this.selectedSustainabilityFilters.size > 0) {
      result = result.filter(p => {
        const productTags = p.sustainabilityTags || [];
        return Array.from(this.selectedSustainabilityFilters).some(filter =>
          productTags.includes(filter)
        );
      });
    }

    return result;
  }

  discountPercent(product: MarketplaceProduct): number {
    if (!product.discountPrice || !product.salePrice) return 0;
    return Math.round((1 - product.discountPrice / product.salePrice) * 100);
  }
}
