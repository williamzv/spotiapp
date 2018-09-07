import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public nuevasCanciones: any[] = [];
  public loading: boolean;
  public error: boolean;
  public msgError: string;

  constructor( private spotify: SpotifyService ) {
    this.loading = true;
    this.error = false;
    this.msgError = '';
    this.spotify.getNewReleases()
    .subscribe( data => {
      this.nuevasCanciones = data;
      this.loading = false;
    }, (errorServicio => {
      this.loading = false;
      this.error = true;
      this.msgError = errorServicio.error.error.message;
    }));
  }

}
