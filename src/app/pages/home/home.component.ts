import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { SupabaseService, MarketplaceCategory, MarketplaceProduct } from '../../services/supabase.service';
import { SearchService } from '../../services/search.service';

const CATALOG_CATEGORIES = [
  { id: 1, name: 'Alimentos', image: 'assets/category/colibri-alimento-final.webp' },
  { id: 2, name: 'Aseo', image: 'assets/category/colibri-aseo-final.webp' },
  { id: 3, name: 'Papelería', image: 'assets/category/colibri-papeleria-final.webp' },
  { id: 4, name: 'Artesanía', image: 'assets/category/colibri-artesania.webp' },
  { id: 5, name: 'Pet', image: 'assets/category/colibri-pet.webp' },
  { id: 6, name: 'Cuidado', image: 'assets/category/colibri-cuidado.webp' },
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

const MOCK_PRODUCTS: MarketplaceProduct[] = [
  {
    PK_product: 1, FK_entrepreneurship: 2,
    productName: 'Mermelada de Rosa Artesanal', salePrice: 85, discountPrice: 72,
    mainImage: 'assets/products/alma-de-rosa1.png',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Alma de Rosa' },
  },
  {
    PK_product: 2, FK_entrepreneurship: 3,
    productName: 'Jabón Saponificado Aloe Vera', salePrice: 45, discountPrice: 38,
    mainImage: 'assets/products/aloe-leben.jpg',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Aloe Leben' },
  },
  {
    PK_product: 3, FK_entrepreneurship: 4,
    productName: 'Granola de Amaranto sin Gluten', salePrice: 55,
    mainImage: 'assets/products/conocete1.jpg',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Amaria' },
  },
  {
    PK_product: 4, FK_entrepreneurship: 5,
    productName: 'Bebida de Cúrcuma y Jengibre Orgánica', salePrice: 35, discountPrice: 28,
    mainImage: 'assets/products/botanica-ancestral1.jpg',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Botánica Ancestral' },
  },
  {
    PK_product: 5, FK_entrepreneurship: 6,
    productName: 'Piedras Pintadas Decorativas', salePrice: 50, discountPrice: 42,
    mainImage: 'assets/products/colorina1.jpg',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Colorina by Pao' },
  },
  {
    PK_product: 6, FK_entrepreneurship: 7,
    productName: 'Collar Minimalista Macarena', salePrice: 120, discountPrice: 99,
    mainImage: 'assets/products/macarena1.png',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'MACARENA' },
  },
  {
    PK_product: 7, FK_entrepreneurship: 8,
    productName: 'Jabón Desengrasante Ecológico', salePrice: 32, discountPrice: 26,
    mainImage: 'assets/products/ecofriendly.jpeg',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'ECOFRIENDLY' },
  },
  {
    PK_product: 8, FK_entrepreneurship: 1,
    productName: 'Experiencia de Turismo Responsable', salePrice: 250,
    mainImage: 'assets/products/ampuy1.jpeg',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Ampuy' },
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
  catalogCategories = CATALOG_CATEGORIES;
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
