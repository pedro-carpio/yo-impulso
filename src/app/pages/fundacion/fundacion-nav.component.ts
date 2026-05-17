import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-fundacion-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './fundacion-nav.component.html',
  styleUrl: './fundacion-nav.component.css',
})
export class FundacionNavComponent {}
