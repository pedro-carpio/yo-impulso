import { Component, OnInit } from '@angular/core';
import { SupabaseService, MarketplaceProduct } from '../../services/supabase.service';

export interface AdBanner {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
}

const ADS: AdBanner[] = [
  {
    id: 1,
    title: 'Semana del Emprendedor',
    subtitle: 'Descuentos de hasta 30% en productos artesanales seleccionados',
    cta: 'Ver ofertas',
    image: 'https://placehold.co/800x200/11221a/a3c6b4?text=Semana+del+Emprendedor',
  },
  {
    id: 2,
    title: 'Feria de Productos Organicos',
    subtitle: 'Este sabado en Plaza Colon. Ingreso libre y gratuito.',
    cta: 'Mas info',
    image: 'https://placehold.co/800x200/2a6f54/f2f7f4?text=Feria+Organica',
  },
];

const MOCK_PROMOTED: MarketplaceProduct[] = [
  {
    PK_product: 2, FK_entrepreneurship: 2,
    productName: 'Manta Tejida Andina', salePrice: 280, discountPrice: 240,
    mainImage: 'https://placehold.co/400x360/11221a/a3c6b4?text=Manta+Andina',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Textiles Andinos' },
  },
  {
    PK_product: 5, FK_entrepreneurship: 5,
    productName: 'Bolsas de Yute Artesanales', salePrice: 35, discountPrice: 28,
    mainImage: 'https://placehold.co/400x360/a3c6b4/11221a?text=Bolsas+Yute',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'EcoEmpaques' },
  },
  {
    PK_product: 8, FK_entrepreneurship: 6,
    productName: 'Velas de Cera de Abeja', salePrice: 55, discountPrice: 48,
    mainImage: 'https://placehold.co/400x360/c2d1c6/11221a?text=Velas+Cera',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'ArteNatural' },
  },
  {
    PK_product: 9, FK_entrepreneurship: 3,
    productName: 'Pack Chocolate Artesanal', salePrice: 120, discountPrice: 89,
    mainImage: 'https://placehold.co/400x360/d97706/ffffff?text=Pack+Chocolate',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Cacao Natural Bolivia' },
  },
  {
    PK_product: 10, FK_entrepreneurship: 1,
    productName: 'Kit Apicultura Familiar', salePrice: 200, discountPrice: 160,
    mainImage: 'https://placehold.co/400x360/e2ede7/2a6f54?text=Kit+Miel',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Apicultura Natural' },
  },
  {
    PK_product: 11, FK_entrepreneurship: 5,
    productName: 'Cafe Blend Especial 500g', salePrice: 140, discountPrice: 110,
    mainImage: 'https://placehold.co/400x360/1a3528/f2f7f4?text=Blend+Especial',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Cafe Los Yungas' },
  },
];

export type GridItem =
  | { kind: 'product'; data: MarketplaceProduct }
  | { kind: 'ad'; data: AdBanner };

@Component({
  selector: 'app-promociones',
  standalone: true,
  imports: [],
  templateUrl: './promociones.component.html',
  styleUrl: './promociones.component.css',
})
export class PromocionesComponent implements OnInit {
  gridItems: GridItem[] = [];
  loading = true;

  constructor(private supabase: SupabaseService) {}

  ngOnInit(): void {
    this.supabase.getPromotedProducts().subscribe(prods => {
      const products = prods.length ? prods : MOCK_PROMOTED;
      this.gridItems = this.buildGrid(products);
      this.loading = false;
    });
  }

  private buildGrid(products: MarketplaceProduct[]): GridItem[] {
    const items: GridItem[] = [];
    let adIndex = 0;
    products.forEach((p, i) => {
      if (i > 0 && i % 4 === 0 && adIndex < ADS.length) {
        items.push({ kind: 'ad', data: ADS[adIndex++] });
      }
      items.push({ kind: 'product', data: p });
    });
    return items;
  }

  isProduct(item: GridItem): item is { kind: 'product'; data: MarketplaceProduct } {
    return item.kind === 'product';
  }

  isAd(item: GridItem): item is { kind: 'ad'; data: AdBanner } {
    return item.kind === 'ad';
  }

  discountPercent(product: MarketplaceProduct): number {
    if (!product.discountPrice || !product.salePrice) return 0;
    return Math.round((1 - product.discountPrice / product.salePrice) * 100);
  }
}
