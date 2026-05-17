import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface MarketplaceCategory {
  PK_category: number;
  category: string;
  description?: string;
}

export interface Entrepreneurship {
  PK_entrepreneurship: number;
  FK_category: number;
  businessName: string;
  description: string;
  locationType?: string;
  mainImage?: string;
  isVirtual: boolean;
  isActive: boolean;
  tbmarketplacecategories?: { category: string };
}

export interface MarketplaceProduct {
  PK_product: number;
  FK_entrepreneurship: number;
  productName: string;
  description?: string;
  salePrice?: number;
  discountPrice?: number;
  mainImage?: string;
  isAvailable: boolean;
  tbentrepreneurships?: { businessName: string };
}

// Replace with your Supabase project credentials
const SUPABASE_URL = 'https://wgagqiasuwpecxgvamqf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_aNYRCO9RbhpEd31KNEncqg_Fk5EhrQq';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private client: SupabaseClient | null = null;

  constructor() {
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      this.client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
  }

  getCategories(): Observable<MarketplaceCategory[]> {
    if (!this.client) return of([]);
    return from(
      this.client.from('tbmarketplacecategories').select('*').order('category')
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data as MarketplaceCategory[]) ?? [];
      }),
      catchError(() => of([]))
    );
  }

  getProducts(): Observable<MarketplaceProduct[]> {
    if (!this.client) return of([]);
    return from(
      this.client
        .from('tbmarketplaceproducts')
        .select('*, tbentrepreneurships(businessName)')
        .eq('isAvailable', true)
        .order('createdAt', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data as MarketplaceProduct[]) ?? [];
      }),
      catchError(() => of([]))
    );
  }

  getPromotedProducts(): Observable<MarketplaceProduct[]> {
    if (!this.client) return of([]);
    return from(
      this.client
        .from('tbmarketplaceproducts')
        .select('*, tbentrepreneurships(businessName)')
        .eq('isAvailable', true)
        .not('discountPrice', 'is', null)
        .order('salePrice', { ascending: true })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data as MarketplaceProduct[]) ?? [];
      }),
      catchError(() => of([]))
    );
  }

  getEntrepreneurships(): Observable<Entrepreneurship[]> {
    if (!this.client) return of([]);
    return from(
      this.client
        .from('tbentrepreneurships')
        .select('*, tbmarketplacecategories(category)')
        .eq('isActive', true)
        .order('businessName')
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data as Entrepreneurship[]) ?? [];
      }),
      catchError(() => of([]))
    );
  }
}
