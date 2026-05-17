import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-emprendedor-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './emprendedor-nav.component.html',
  styleUrl: './emprendedor-nav.component.css',
})
export class EmprendedorNavComponent {}
