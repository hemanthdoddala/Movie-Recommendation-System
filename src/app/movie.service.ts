import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  baseUrl = 'http://localhost:5000'
  // baseUrl = 'https://flixify.herokuapp.com'

  constructor(private http: HttpClient) { }

  getRatingDistribution(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getRatingDistribution`)
  }

  getGenreTreemap():Observable<any> {
    return this.http.get(`${this.baseUrl}/getTreeGenreMap`)
  }

  getMovieRatingPieChart():Observable<any> {
    return this.http.get(`${this.baseUrl}/getMoviePieChart`)
  }

  getSimilarMovies(moviename:string, recommendations:number): Observable<any> {
    let params = {
      moviename:moviename,
      recommendations:recommendations
    }
     return this.http.get(`${this.baseUrl}/getSimilarMovies`, {params: params})
  }

  getTopRatedMovies(nrecommendations:number) {
    let params = {
      recommendations:nrecommendations
    }
    return this.http.get(`${this.baseUrl}/getTopRatedMovies`, {params: params})
  }

  getGenre():Observable<any> {
    return this.http.get(`${this.baseUrl}/getGenre`)
  }

  getMostWatched():Observable<any> {
    return this.http.get(`${this.baseUrl}/getMostWatchedMovies`)
  }

  getTopRatedMoviesByGenre(genre:string, nrecommendations:number):Observable<any> {
    let params = {
      genre: genre,
      recommendations:nrecommendations
    }
    return this.http.get(`${this.baseUrl}/getTopRatedMoviesByGenre`, {params: params})
  }

  getMoviePopularity(moviename:string):Observable<any> {
    let params = {
      moviename:moviename
    }
    return this.http.get(`${this.baseUrl}/getPopularityOfMovie`, {params:params})
  }

  getMoviesByCollabFiltering(userid:number, recommendations:number):Observable<any> {
    let params = {
      userid:userid,
      recommendations:recommendations
    }
    return this.http.get(`${this.baseUrl}/getMoviesByCollabFiltering`, {params:params})
  }

  getRecommendationsFromNN(userid:number, recommendations:number):Observable<any> {
    let params = {
      userid:userid,
      recommendations:recommendations
    }
    return this.http.get(`${this.baseUrl}/getRecommendationsFromNn`, {params:params});
  }

  getMoviesWatchedByUser(userid:number) {
    let params = {
      userid:userid
    }
    return this.http.get(`${this.baseUrl}/getMoviesWatchedByUser`, {params:params})
  }
}