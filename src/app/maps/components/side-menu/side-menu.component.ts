import { Component } from '@angular/core';

interface MenuItem {
  name: string;
  route: string;
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    {
      name: 'Full screen',
      route: '/fullscreen',
    },
    {
      name: 'Zoom range',
      route: '/zoom-range',
    },
    {
      name: 'Markers',
      route: '/markers',
    },
    {
      name: 'Properties',
      route: '/properties',
    },
  ];
}
