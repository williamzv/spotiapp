import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent {
  public artistas: any[] = [];
  public loading: boolean;
  public error: boolean;
  public msgError: string;
  constructor( public _spotify: SpotifyService) {
    this.error = false;
    this.msgError = '';
  }

  buscarArtista( termino: string ) {
    if (termino.length > 0) {
      this.loading = true;
      this._spotify.getArtistas(termino)
          .subscribe( data => {
            this.artistas = data;
            this.loading = false;
          }, (errorServicio => {
            this.loading = false;
            this.error = true;
            this.msgError = errorServicio.error.error.message;
          }));
    }
  }
}
