import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerWithColor {
  marker: Marker;
  color: string;
}

interface PlainMarkerWithColor {
  position: number[];
  color: string;
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css'],
})
export class MarkersPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') mapContainer?: ElementRef;

  public map?: Map;
  public zoom: number = 13;
  public center: LngLat = new LngLat(-75.56, 6.27);
  public markersWithColor: MarkerWithColor[] = [];

  ngAfterViewInit(): void {
    if (!this.mapContainer) return;

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.center,
      zoom: this.zoom,
    });

    this.loadFromLocalStorage();
  }

  ngOnDestroy(): void {
    this.markersWithColor.forEach((markerWithColor) =>
      markerWithColor.marker.remove()
    );
  }

  createMarker(): void {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const position = this.map.getCenter();

    this.addMarker(position, color);
  }

  addMarker(
    position: LngLat | [number, number],
    color: string = '#006633'
  ): void {
    if (!this.map) return;

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Andrés Jiménez';

    const marker = new Marker({
      color,
      draggable: true,
      // element: markerHtml,
    })
      .setLngLat(position)
      .addTo(this.map);

    this.markersWithColor.push({ marker, color });
    this.saveToLocalStorage();

    marker.on('dragend', () => this.saveToLocalStorage());
  }

  deleteMarker(index: number): void {
    this.markersWithColor[index].marker.remove();
    this.markersWithColor.splice(index, 1);
  }

  flyTo(marker: Marker): void {
    if (!this.map) return;

    this.map.flyTo({ zoom: 13, center: marker.getLngLat() });
  }

  saveToLocalStorage(): void {
    const plainMarkersWithColor: PlainMarkerWithColor[] =
      this.markersWithColor.map((markerWithColor) => ({
        position: markerWithColor.marker.getLngLat().toArray(),
        color: markerWithColor.color,
      }));

    localStorage.setItem(
      'plain-markers-with-color',
      JSON.stringify(plainMarkersWithColor)
    );
  }

  loadFromLocalStorage() {
    const plainMarkersWithColorString = localStorage.getItem(
      'plain-markers-with-color'
    );

    if (!plainMarkersWithColorString) return;

    const plainMarkersWithColor: PlainMarkerWithColor[] = JSON.parse(
      plainMarkersWithColorString
    );

    plainMarkersWithColor.forEach(({ position, color }) => {
      const [lng, lat] = position;
      const lngLat = new LngLat(lng, lat);

      this.addMarker(lngLat, color);
    });
  }
}
