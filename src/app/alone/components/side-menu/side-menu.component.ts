import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  name: string;
  route: string;
}

@Component({
  standalone: true,
  selector: 'side-menu',
  imports: [RouterModule, CommonModule],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    {
      name: 'Full screen',
      route: '/maps/fullscreen',
    },
    {
      name: 'Zoom range',
      route: '/maps/zoom-range',
    },
    {
      name: 'Markers',
      route: '/maps/markers',
    },
    {
      name: 'Properties',
      route: '/maps/properties',
    },
    {
      name: 'Alone',
      route: '/alone',
    },
  ];
}
