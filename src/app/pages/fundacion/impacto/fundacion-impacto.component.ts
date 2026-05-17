import { Component } from '@angular/core';
import { FundacionNavComponent } from '../fundacion-nav.component';

interface ImpactRow {
  id: number;
  businessName: string;
  category: string;
  location: string;
  mainImage: string;
  attendanceRate: number;
  reportingRate: number;
  growthScore: number;
  lastReport: string;
}

@Component({
  selector: 'app-fundacion-impacto',
  standalone: true,
  imports: [FundacionNavComponent],
  templateUrl: './fundacion-impacto.component.html',
  styleUrl: './fundacion-impacto.component.css',
})
export class FundacionImpactoComponent {
  readonly impactRows: ImpactRow[] = [
    {
      id: 1,
      businessName: 'Apicultura Natural',
      category: 'Alimentos',
      location: 'Cochabamba',
      mainImage: 'https://placehold.co/220x160/1a3528/f2f7f4?text=Apicultura',
      attendanceRate: 82,
      reportingRate: 74,
      growthScore: 68,
      lastReport: 'Hace 3 dias',
    },
    {
      id: 2,
      businessName: 'Textiles Andinos',
      category: 'Textiles',
      location: 'Sacaba',
      mainImage: 'https://placehold.co/220x160/11221a/a3c6b4?text=Textiles',
      attendanceRate: 76,
      reportingRate: 62,
      growthScore: 71,
      lastReport: 'Hace 5 dias',
    },
    {
      id: 3,
      businessName: 'Cafe Los Yungas',
      category: 'Alimentos',
      location: 'La Paz',
      mainImage: 'https://placehold.co/220x160/2a6f54/f2f7f4?text=Cafe',
      attendanceRate: 88,
      reportingRate: 83,
      growthScore: 77,
      lastReport: 'Hace 2 dias',
    },
    {
      id: 4,
      businessName: 'EcoEmpaques',
      category: 'Artesanias',
      location: 'Quillacollo',
      mainImage: 'https://placehold.co/220x160/a3c6b4/11221a?text=EcoEmpaques',
      attendanceRate: 64,
      reportingRate: 58,
      growthScore: 60,
      lastReport: 'Hace 1 semana',
    },
    {
      id: 5,
      businessName: 'ArteNatural',
      category: 'Artesanias',
      location: 'Cochabamba',
      mainImage: 'https://placehold.co/220x160/c2d1c6/11221a?text=ArteNatural',
      attendanceRate: 72,
      reportingRate: 66,
      growthScore: 69,
      lastReport: 'Hace 4 dias',
    },
    {
      id: 6,
      businessName: 'Huertos Urbanos',
      category: 'Agroecologia',
      location: 'Tiquipaya',
      mainImage: 'https://placehold.co/220x160/e2ede7/2a6f54?text=Huertos',
      attendanceRate: 90,
      reportingRate: 87,
      growthScore: 82,
      lastReport: 'Hace 1 dia',
    },
    {
      id: 7,
      businessName: 'Jabones Paraiso',
      category: 'Cosmeticos',
      location: 'Cercado',
      mainImage: 'https://placehold.co/220x160/1a3528/ffffff?text=Jabones',
      attendanceRate: 58,
      reportingRate: 52,
      growthScore: 55,
      lastReport: 'Hace 9 dias',
    },
    {
      id: 8,
      businessName: 'Madera Viva',
      category: 'Madera',
      location: 'Sipe Sipe',
      mainImage: 'https://placehold.co/220x160/3d5a71/ffffff?text=Madera',
      attendanceRate: 79,
      reportingRate: 70,
      growthScore: 66,
      lastReport: 'Hace 6 dias',
    },
    {
      id: 9,
      businessName: 'Cosmos Ceramica',
      category: 'Artesanias',
      location: 'Cochabamba',
      mainImage: 'https://placehold.co/220x160/d97706/ffffff?text=Ceramica',
      attendanceRate: 68,
      reportingRate: 61,
      growthScore: 63,
      lastReport: 'Hace 8 dias',
    },
    {
      id: 10,
      businessName: 'Biodiversa',
      category: 'Servicios',
      location: 'Colcapirhua',
      mainImage: 'https://placehold.co/220x160/2ba891/ffffff?text=Biodiversa',
      attendanceRate: 85,
      reportingRate: 79,
      growthScore: 74,
      lastReport: 'Hace 3 dias',
    },
  ];

  get totalActive(): number {
    return this.impactRows.length;
  }

  get avgAttendance(): number {
    return this.roundAvg('attendanceRate');
  }

  get avgReporting(): number {
    return this.roundAvg('reportingRate');
  }

  get avgGrowth(): number {
    return this.roundAvg('growthScore');
  }

  impactScore(row: ImpactRow): number {
    return Math.round((row.attendanceRate + row.reportingRate + row.growthScore) / 3);
  }

  private roundAvg(field: keyof ImpactRow): number {
    const total = this.impactRows.reduce((acc, row) => acc + (row[field] as number), 0);
    return Math.round(total / this.impactRows.length);
  }
}
