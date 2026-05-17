import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { EmprendedorNavComponent } from '../emprendedor-nav.component';

@Component({
  selector: 'app-emprendedor-finanzas',
  standalone: true,
  imports: [FormsModule, NgChartsModule, EmprendedorNavComponent],
  templateUrl: './emprendedor-finanzas.component.html',
  styleUrl: './emprendedor-finanzas.component.css',
})
export class EmprendedorFinanzasComponent {
  @ViewChildren(BaseChartDirective) charts?: QueryList<BaseChartDirective>;

  labels: string[] = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct'];
  incomeSeries: number[] = [1200, 1380, 1520, 1460, 1700, 1820, 1900, 2100, 2050, 2300];
  costSeries: number[] = [520, 610, 700, 660, 780, 820, 860, 920, 880, 960];
  expenseSeries: number[] = [260, 300, 280, 310, 330, 350, 370, 390, 410, 430];

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.labels,
    datasets: [
      {
        data: this.incomeSeries,
        label: 'Ingresos',
        borderColor: '#2a6f54',
        backgroundColor: 'rgba(42, 111, 84, 0.1)',
        pointBackgroundColor: '#2a6f54',
        tension: 0.3,
      },
      {
        data: this.costSeries,
        label: 'Costos',
        borderColor: '#1a3528',
        backgroundColor: 'rgba(26, 53, 40, 0.08)',
        pointBackgroundColor: '#1a3528',
        tension: 0.3,
      },
      {
        data: this.expenseSeries,
        label: 'Gastos',
        borderColor: '#2ba891',
        backgroundColor: 'rgba(43, 168, 145, 0.1)',
        pointBackgroundColor: '#2ba891',
        tension: 0.3,
      },
    ],
  };

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.labels,
    datasets: [
      {
        data: this.marginSeries(),
        label: 'Margen neto',
        backgroundColor: '#11221a',
        borderRadius: 8,
      },
    ],
  };

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          color: '#1a3528',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#3d5a71' },
        grid: { color: 'rgba(226, 237, 231, 0.8)' },
      },
      y: {
        ticks: { color: '#3d5a71' },
        grid: { color: 'rgba(226, 237, 231, 0.8)' },
      },
    },
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { color: '#3d5a71' },
        grid: { display: false },
      },
      y: {
        ticks: { color: '#3d5a71' },
        grid: { color: 'rgba(226, 237, 231, 0.8)' },
      },
    },
  };

  draftMonth = '';
  draftIncome: number | null = null;
  draftCosts: number | null = null;
  draftExpenses: number | null = null;

  get lastIncome(): number {
    return this.incomeSeries[this.incomeSeries.length - 1] ?? 0;
  }

  get lastCosts(): number {
    return this.costSeries[this.costSeries.length - 1] ?? 0;
  }

  get lastExpenses(): number {
    return this.expenseSeries[this.expenseSeries.length - 1] ?? 0;
  }

  get lastMargin(): number {
    return this.lastIncome - this.lastCosts - this.lastExpenses;
  }

  get avgMargin(): number {
    const margins = this.marginSeries();
    const total = margins.reduce((acc, val) => acc + val, 0);
    return Math.round(total / margins.length);
  }

  addEntry(): void {
    const income = Number(this.draftIncome);
    const costs = Number(this.draftCosts);
    const expenses = Number(this.draftExpenses);
    if (!Number.isFinite(income) || !Number.isFinite(costs) || !Number.isFinite(expenses)) return;

    const label = this.draftMonth.trim() || 'Nuevo';
    this.labels = [...this.labels.slice(1), label];
    this.incomeSeries = [...this.incomeSeries.slice(1), income];
    this.costSeries = [...this.costSeries.slice(1), costs];
    this.expenseSeries = [...this.expenseSeries.slice(1), expenses];

    this.refreshCharts();

    this.draftMonth = '';
    this.draftIncome = null;
    this.draftCosts = null;
    this.draftExpenses = null;
  }

  private refreshCharts(): void {
    this.lineChartData.labels = [...this.labels];
    this.lineChartData.datasets[0].data = [...this.incomeSeries];
    this.lineChartData.datasets[1].data = [...this.costSeries];
    this.lineChartData.datasets[2].data = [...this.expenseSeries];

    this.barChartData.labels = [...this.labels];
    this.barChartData.datasets[0].data = this.marginSeries();

    this.charts?.forEach(chart => chart.update());
  }

  private marginSeries(): number[] {
    return this.incomeSeries.map((val, idx) => val - this.costSeries[idx] - this.expenseSeries[idx]);
  }
}
