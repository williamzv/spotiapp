import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable()
export class SpotifyService {
  public artistas: any[] = [];

  constructor(private http: HttpClient, private token: TokenService) {

  }

  getQuery ( query: string ) {
    const urlSpotify = `https://api.spotify.com/v1/${query}`;
    const headers = this.getHeaders();
    return this.http.get(urlSpotify, {headers});
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'authorization' : 'Bearer ' +  this.token.getAccessToken()
    });
    return headers;
  }

  getNewReleases() {
    const headers = this.getHeaders();
    return this.getQuery('browse/new-releases?limit=20')
      .pipe( map(data => data['albums'].items));
  }


  getArtistas(termino: string) {
    return this.getQuery(`search?query=${ termino }&type=artist&limit=20`)
      .pipe( map( data => data['artists'].items));
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${ id }`);
      // .pipe( map( data => data['artists'].items));
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
      .pipe( map( data => data['tracks']));
  }

}
