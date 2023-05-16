import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css'],
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') mapContainer?: ElementRef;

  public map?: Map;
  public zoom: number = 13;
  public center: LngLat = new LngLat(-75.56, 6.27);

  ngAfterViewInit(): void {
    if (!this.mapContainer) return;

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.center,
      zoom: this.zoom,
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    if (!this.map) return;

    this.map.remove();
  }

  mapListeners(): void {
    if (!this.map) return;

    this.map.on('zoom', () => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', () => {
      if (this.map!.getZoom() < 18) return;

      this.map?.zoomTo(18);
    });

    this.map.on('move', () => {
      this.center = this.map!.getCenter();
    });
  }

  zoomIn(): void {
    if (!this.map) return;

    this.map?.zoomIn();
  }

  zoomOut(): void {
    if (!this.map) return;

    if (this.map.getZoom() <= 0.76) return;

    this.map?.zoomOut();
  }

  zoomChanged(value: string): void {
    this.zoom = Number(value);

    if (this.map) this.map.zoomTo(this.zoom);
  }
}
