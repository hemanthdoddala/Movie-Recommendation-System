import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Spinkit } from 'ng-http-loader';
import { debounceTime, Observable, of } from 'rxjs';
import { MovieService } from '../movie.service'; 
import { SpinnerVisibilityService } from 'ng-http-loader';

interface Movie {
  name: string;
  poster: string;
  rating: number;
}

interface MovieInfo {
  movie_id: string;
  poster: string;
  title: string;
}

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  users$ = new Observable<any>();
  spinnerStyle = Spinkit;
  baseUrl = this.movieService.baseUrl;
  moviesinfo:MovieInfo[];
  recommendations:Observable<any>;
  genres:Observable<any>;
  mostWatchedMovies:Observable<any>;
  

  suggestions: any;
  slideConfig = {
    slidesToShow: 9,
    slidesToScroll: 1,
    dots: false,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 3560,
        settings: {
          slidesToShow: 14,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 9,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 9,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  };
  form: FormGroup;
  recommendationTypes: string[] = ["Top Rated", "Top Rated By Genre", "Similar Movie"];
  filteredItems: string[] = [];
  imagePath: string = '../../assets/background.jpg';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private movieService:MovieService,
    private spinner: SpinnerVisibilityService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      recommendationtype: ['', Validators.required],
      moviename: ['', Validators.required],
      genre:['', Validators.required],
      numberofrecommendations : [20, Validators.required]
    });
    this.getGenre();
    this.getMoviesInfo();
    this.getMostWatchedMovies();
    this.form.get('moviename')?.valueChanges.pipe(
      debounceTime(1000) // wait 300ms after each keystroke
    ).subscribe(value => {
      this.search(value);
    });
    this.form.get('recommendationtype')?.valueChanges.subscribe(value=>{
      if(value !== 'Similar Movie') {
        this.form.get('moviename')?.clearValidators();
        this.form.get('moviename')?.reset();
        this.form.get('moviename')?.setErrors(null)
        this.form.get('moviename')?.updateValueAndValidity();
      } else {
        this.form.get('moviename')?.setValidators([Validators.required]);
        this.form.get('moviename')?.updateValueAndValidity();
      }
      if(value !== 'Top Rated By Genre') {
        this.form.get('genre')?.clearValidators();
        this.form.get('genre')?.reset();
        this.form.get('genre')?.setErrors(null)
        this.form.get('genre')?.updateValueAndValidity();
      } else {
        this.form.get('genre')?.setValidators([Validators.required]);
        this.form.get('genre')?.updateValueAndValidity();
      }
    });
  }


  search(keyword: string) {
    if (keyword !== '') {
      this.suggestions = this.moviesinfo.filter(s => s.title.toLowerCase().replace(/[^a-z0-9]/g, "").includes(keyword.toLowerCase().replace(/[^a-z0-9]/g, "")));
    }
  }


  onSelect(item: string) {
    this.form.patchValue({ search: item });
    this.filteredItems = [];
  }

  getSampleMessage() {
    this.http.get(this.baseUrl).subscribe((data: any) => {
      console.log(data);
      console.log("sample data above")
    })
  }

  getUsers() {
    this.http.get(this.baseUrl + '/getUsers').subscribe((data: any) => {
      this.users$ = of(data.users)
      console.log(data.users);
    });
  }

  getMoviesInfo() {
    this.http.get(this.baseUrl + '/getMoviesInfo').subscribe((data: any) => {
      this.moviesinfo = data.moviesinfo
    });
  }

  recommendMovies() {
    const data = this.form.getRawValue();
    this.spinner.show();
    if (data.recommendationtype === 'Similar Movie') {
      this.movieService.getSimilarMovies(data.moviename, data.numberofrecommendations).subscribe(data=>{
        this.recommendations = of(data)
        this.spinner.hide();
      })
    } else if (data.recommendationtype === 'Top Rated') {
      this.movieService.getTopRatedMovies(data.numberofrecommendations).subscribe(data=>{
        this.recommendations = of(data)
        this.spinner.hide();
      })
    } else if (data.recommendationtype === 'Top Rated By Genre') {
      this.movieService.getTopRatedMoviesByGenre(data.genre, data.numberofrecommendations).subscribe(data=>{
        this.recommendations = of(data)
        this.spinner.hide();
      })
    }
  }

  getGenre() {
    this.movieService.getGenre().subscribe(data=>{
      this.genres = of(data)
    })
  }

  getMostWatchedMovies() {
    this.movieService.getMostWatched().subscribe(data=>{
      this.mostWatchedMovies = of(data)
    })
  }
}
