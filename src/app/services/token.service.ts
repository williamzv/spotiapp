import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private token: SpotifyToken = {
    access_token: '',
    token_type: '',
    expires_in: 0,
    last_token: null
  };

  constructor( private http: HttpClient) {
    this.cargarToken();
   }

  guardarToken() {
    localStorage.setItem('spotifytoken', JSON.stringify(this.token));
  }

  cargarToken() {
    if (localStorage.getItem('spotifytoken')) {
      // Si existe un token en el local, verificar que no haya expirado.
      this.token = JSON.parse(localStorage.getItem('spotifytoken'));
      const fecha_hoy: Date = new Date();
      const fecha_token: Date = new Date(this.token.last_token);

      const seconds: number = (Math.abs(fecha_hoy.getTime() - fecha_token.getTime())) / 1000 ;
      if (seconds >= this.token.expires_in ) {
        // cargar un nuevo token desde el servidor spotify
        this.getTokenFromSpotify();
      } else {
        // No ha expirado, determinar cuanto tiempo le falta para expirar.
        const falta = this.token.expires_in - seconds;
        if (falta <= 900) {  // Si faltan menos de 15min.
            // Cargar un nuevo token desde el servidor spotify
            this.getTokenFromSpotify();
        }
      }
    } else {
      // Cargar un nuevo token desde el servidor spotify
      this.getTokenFromSpotify();
    }
  }


  getTokenFromSpotify() {
    const url = 'https://spotifygettoken.herokuapp.com/spotify/4fea3eeb484b4013a7bc645ca430daf1/a375891c4e58405d9c3399b84c4a8b37';
    this.http.get(url).subscribe( data => {
      this.token.access_token = data['access_token'];
      this.token.token_type = data['token_type'];
      this.token.expires_in = data['expires_in'];
      this.token.last_token = new Date();
      this.guardarToken();
    }, (err => console.log('Error: ', err)));
  }

  getAccessToken(): string {
    this.cargarToken();
    return this.token.access_token;
  }
}

interface SpotifyToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  last_token: Date;
}
