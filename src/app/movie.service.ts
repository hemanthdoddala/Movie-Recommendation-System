import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // baseUrl = 'http://localhost:5000'
  baseUrl = 'http://18.212.243.69:80'

  constructor(private http: HttpClient) { }

  // Get movie ratings by genre
  // getRatingsByGenre(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/movies/ratings/genre`);
  // }

  // // Get movie ratings by year
  // getRatingsByYear(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/movies/ratings/year`);
  // }

  getRatingDistribution(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getRatingDistribution`)
  }
}