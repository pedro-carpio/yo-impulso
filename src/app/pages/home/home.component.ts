import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { SupabaseService, MarketplaceCategory, MarketplaceProduct } from '../../services/supabase.service';
import { SearchService } from '../../services/search.service';

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

const MOCK_PRODUCTS: MarketplaceProduct[] = [
  {
    PK_product: 1, FK_entrepreneurship: 1,
    productName: 'Miel Organica 500g', salePrice: 85,
    mainImage: 'https://placehold.co/400x320/e2ede7/2a6f54?text=Miel',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Apicultura Natural' },
  },
  {
    PK_product: 2, FK_entrepreneurship: 2,
    productName: 'Manta Tejida Andina', salePrice: 280, discountPrice: 240,
    mainImage: 'https://placehold.co/400x320/11221a/a3c6b4?text=Textil',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Textiles Andinos' },
  },
  {
    PK_product: 3, FK_entrepreneurship: 3,
    productName: 'Crema de Cacao Puro', salePrice: 65,
    mainImage: 'https://placehold.co/400x320/d97706/ffffff?text=Cacao',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Cacao Natural' },
  },
  {
    PK_product: 4, FK_entrepreneurship: 4,
    productName: 'Cafe de Altura 250g', salePrice: 90,
    mainImage: 'https://placehold.co/400x320/1a3528/f2f7f4?text=Cafe',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Cafe Los Yungas' },
  },
  {
    PK_product: 5, FK_entrepreneurship: 5,
    productName: 'Bolsas de Yute', salePrice: 35, discountPrice: 28,
    mainImage: 'https://placehold.co/400x320/a3c6b4/11221a?text=Yute',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'EcoEmpaques' },
  },
  {
    PK_product: 6, FK_entrepreneurship: 6,
    productName: 'Chocolate 70% Cacao', salePrice: 45,
    mainImage: 'https://placehold.co/400x320/2a6f54/ffffff?text=Chocolate',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Chocolates del Tropico' },
  },
  {
    PK_product: 7, FK_entrepreneurship: 1,
    productName: 'Quinua Organica 1kg', salePrice: 70,
    mainImage: 'https://placehold.co/400x320/e2ede7/1a3528?text=Quinua',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Granos del Altiplano' },
  },
  {
    PK_product: 8, FK_entrepreneurship: 6,
    productName: 'Velas de Cera de Abeja', salePrice: 55, discountPrice: 48,
    mainImage: 'https://placehold.co/400x320/c2d1c6/11221a?text=Velas',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'ArteNatural' },
  },
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  categories: MarketplaceCategory[] = [];
  products: MarketplaceProduct[] = [];
  selectedCategory: number | null = null;
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
    this.supabase.getCategories().subscribe(cats => {
      this.categories = cats.length ? cats : MOCK_CATEGORIES;
    });
    this.supabase.getProducts().subscribe(prods => {
      this.products = prods.length ? prods : MOCK_PRODUCTS;
      this.loading = false;
    });
  }

  selectCategory(id: number): void {
    this.selectedCategory = this.selectedCategory === id ? null : id;
  }

  get filteredProducts(): MarketplaceProduct[] {
    let result = this.products;
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.productName.toLowerCase().includes(q) ||
        p.tbentrepreneurships?.businessName.toLowerCase().includes(q)
      );
    }
    return result;
  }

  discountPercent(product: MarketplaceProduct): number {
    if (!product.discountPrice || !product.salePrice) return 0;
    return Math.round((1 - product.discountPrice / product.salePrice) * 100);
  }
}
