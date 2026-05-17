import { Component, OnInit } from '@angular/core';
import { MarketplaceProduct } from '../../services/supabase.service';

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
    title: 'Descubre Emprendimientos Sostenibles',
    subtitle: 'Productos artesanales, orgánicos y eco-amigables de emprendedores locales',
    cta: 'Explorar',
    image: 'assets/map.png',
  },
  {
    id: 2,
    title: 'Apoya el Impacto Social',
    subtitle: 'Cada compra impacta positivamente en comunidades rurales y emprendedores bolivianos',
    cta: 'Conocer más',
    image: 'assets/category/colibri-artesania.webp',
  },
];

const MOCK_PROMOTED: MarketplaceProduct[] = [
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
    mainImage: 'assets/products/alma-de-rosa2.jpeg',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Aloe Leben' },
  },
  {
    PK_product: 3, FK_entrepreneurship: 4,
    productName: 'Granola de Amaranto sin Gluten', salePrice: 55, discountPrice: 45,
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
    productName: 'Velas Artesanales Ecológicas', salePrice: 55, discountPrice: 45,
    mainImage: 'assets/products/ecofriendly.jpeg',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'ECOFRIENDLY' },
  },
  {
    PK_product: 8, FK_entrepreneurship: 8,
    productName: 'Jabón Desengrasante Ecológico', salePrice: 32, discountPrice: 26,
    mainImage: 'assets/products/ceramica-verde1.png',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'ECOFRIENDLY' },
  },
  {
    PK_product: 9, FK_entrepreneurship: 2,
    productName: 'Jarabe Artesanal de Rosa', salePrice: 65, discountPrice: 55,
    mainImage: 'assets/products/alma-de-rosa2.jpeg',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Alma de Rosa' },
  },
  {
    PK_product: 10, FK_entrepreneurship: 1,
    productName: 'Experiencia de Turismo Responsable', salePrice: 250, discountPrice: 200,
    mainImage: 'assets/products/ampuy1.jpeg',
    isAvailable: true,
    tbentrepreneurships: { businessName: 'Ampuy' },
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

  ngOnInit(): void {
    this.gridItems = this.buildGrid(MOCK_PROMOTED);
    this.loading = false;
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
