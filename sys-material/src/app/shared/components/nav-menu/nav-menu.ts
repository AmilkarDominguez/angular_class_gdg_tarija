import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

interface NavModule {
  title: string;
  icon: string;
  items: NavItem[];
}

@Component({
  selector: 'app-nav-menu',
  imports: [
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatExpansionModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './nav-menu.html',
  styleUrl: './nav-menu.scss',
})
export class NavMenu {
  readonly modules: NavModule[] = [
    {
      title: 'Inventario',
      icon: 'menu_book',
      items: [
        { label: 'Productos', icon: 'label', route: '/admin/products' }
      ]
    },
    {
      title: 'Ventas',
      icon: 'meeting_room',
      items: []
    }
  ];
}
