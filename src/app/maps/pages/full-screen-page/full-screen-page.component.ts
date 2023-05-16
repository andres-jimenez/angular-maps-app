import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { Map } from 'mapbox-gl';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css'],
})
export class FullScreenPageComponent implements AfterViewInit {
  @ViewChild('map') mapContainer?: ElementRef;

  ngAfterViewInit(): void {
    if (!this.mapContainer) return;

    const map = new Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-75.56, 6.27],
      zoom: 13,
    });
  }
}
