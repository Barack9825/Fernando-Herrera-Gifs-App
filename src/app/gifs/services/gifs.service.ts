import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apikey: string = 'lnYJFStfYykY9u3ddOKnKH7PsKooC1tP';
  private _historial: string[] = [];

  // TODO: Cambiar any por su tipo correspondoente
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('Historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('Imagenes')!) || [];
   
    /* if (localStorage.getItem('Historial')) {
      this._historial = JSON.parse(localStorage.getItem('Historial')!);
    } */
  }

  buscarGifs(query: string) {
    query = query.toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('Historial', JSON.stringify(this._historial));
      
    }

    this.http
      .get<SearchGifsResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=lnYJFStfYykY9u3ddOKnKH7PsKooC1tP&q=${query}&limit=10&`
      )
      .subscribe((resp) => {
        
        this.resultados = resp.data;
      
        
        localStorage.setItem('Imagenes', JSON.stringify(this.resultados));
      });
  }
}
