import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apikey: string = 'lnYJFStfYykY9u3ddOKnKH7PsKooC1tP';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
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

    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', '10')
      .set('q', query);

    console.log(params.toString());

    this.http
      .get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp) => {
        this.resultados = resp.data;

        localStorage.setItem('Imagenes', JSON.stringify(this.resultados));
      });
  }
}
