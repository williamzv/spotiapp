import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: []
})
export class ArtistComponent {
  public loading: boolean;
  artista: any = {};
  pistas: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, private _spotify: SpotifyService) {
    this.activatedRoute.params.subscribe( params => {
      this.loading = true;
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    });
   }

  getArtista( id: string ) {
    this.loading = true;
    this._spotify.getArtista( id )
        .subscribe( artista => {
          this.loading = false;
          this.artista = artista;
        });
  }

  getTopTracks( id: string ) {
    this._spotify.getTopTracks( id )
      .subscribe( topTracks => {
        console.log(topTracks);
        this.pistas = topTracks;
      });
  }

}
