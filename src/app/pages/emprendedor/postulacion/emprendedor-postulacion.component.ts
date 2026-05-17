import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmprendedorNavComponent } from '../emprendedor-nav.component';

interface FormStep {
  id: number;
  title: string;
  description: string;
}

interface FormField {
  id: string;
  label: string;
  step: number;
  type: 'text' | 'tel' | 'select' | 'number';
  placeholder?: string;
  options?: string[];
}

@Component({
  selector: 'app-emprendedor-postulacion',
  standalone: true,
  imports: [FormsModule, EmprendedorNavComponent],
  templateUrl: './emprendedor-postulacion.component.html',
  styleUrl: './emprendedor-postulacion.component.css',
})
export class EmprendedorPostulacionComponent {
  readonly steps: FormStep[] = [
    { id: 0, title: 'Datos basicos', description: 'Informacion esencial del emprendimiento.' },
    { id: 1, title: 'Producto e impacto', description: 'Define el enfoque 10R y tu oferta principal.' },
    { id: 2, title: 'Evidencia', description: 'Canales y capacidad mensual estimada.' },
  ];

  readonly fields: FormField[] = [
    { id: 'businessName', label: 'Nombre del emprendimiento', step: 0, type: 'text', placeholder: 'EcoMiel Cochabamba' },
    { id: 'contactName', label: 'Responsable principal', step: 0, type: 'text', placeholder: 'Ximena Choque' },
    { id: 'phone', label: 'Telefono WhatsApp', step: 0, type: 'tel', placeholder: '7XXXXXXX' },
    { id: 'zone', label: 'Zona o municipio', step: 0, type: 'text', placeholder: 'Cercado, Cochabamba' },
    { id: 'productName', label: 'Producto principal', step: 1, type: 'text', placeholder: 'Miel organica' },
    { id: 'category', label: 'Categoria', step: 1, type: 'select', options: ['Alimentos', 'Artesanias', 'Textiles', 'Cosmeticos', 'Agroecologia'] },
    { id: 'materials', label: 'Insumo o material clave', step: 1, type: 'text', placeholder: 'Cera de abeja, plantas locales' },
    { id: 'tenrFocus', label: 'Practica 10R principal', step: 1, type: 'select', options: ['Rechazar', 'Reducir', 'Reusar', 'Reparar', 'Renovar', 'Redisenar', 'Recuperar', 'Reciclar', 'Revalorizar', 'Regenerar'] },
    { id: 'salesChannel', label: 'Canal actual de venta', step: 2, type: 'text', placeholder: 'WhatsApp, feria local' },
    { id: 'monthlyCapacity', label: 'Capacidad mensual (unidades)', step: 2, type: 'number', placeholder: '40' },
  ];

  readonly tenRs = [
    { n: 'R1', label: 'Rechazar' },
    { n: 'R2', label: 'Reducir' },
    { n: 'R3', label: 'Reusar' },
    { n: 'R4', label: 'Reparar' },
    { n: 'R5', label: 'Renovar' },
    { n: 'R6', label: 'Redisenar' },
    { n: 'R7', label: 'Recuperar' },
    { n: 'R8', label: 'Reciclar' },
    { n: 'R9', label: 'Revalorizar' },
    { n: 'R10', label: 'Regenerar' },
  ];

  activeStep = 0;

  formData: Record<string, string | number> = {
    businessName: '',
    contactName: '',
    phone: '',
    zone: '',
    productName: '',
    category: 'Alimentos',
    materials: '',
    tenrFocus: 'Reducir',
    salesChannel: '',
    monthlyCapacity: '',
  };

  selectedRs: Record<string, boolean> = {
    R1: false,
    R2: true,
    R3: false,
    R4: false,
    R5: false,
    R6: false,
    R7: false,
    R8: true,
    R9: false,
    R10: false,
  };

  get stepFields(): FormField[] {
    return this.fields.filter(field => field.step === this.activeStep);
  }

  nextStep(): void {
    if (this.activeStep < this.steps.length - 1) {
      this.activeStep += 1;
    }
  }

  prevStep(): void {
    if (this.activeStep > 0) {
      this.activeStep -= 1;
    }
  }
}
