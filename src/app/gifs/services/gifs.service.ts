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

  constructor(private http: HttpClient) {}

  buscarGifs(query: string) {
    query = query.toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }

    this.http
      .get<SearchGifsResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=lnYJFStfYykY9u3ddOKnKH7PsKooC1tP&q=${query}&limit=10&`
      )
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
      });
  }
}
