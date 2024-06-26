import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(private gifsService: GifsService) {}

  get historical() {
    return this.gifsService.historial;
  }

  buscar(record: string) {
    this.gifsService.buscarGifs(record);
  }
}
