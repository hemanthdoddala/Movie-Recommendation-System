import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Spinkit } from 'ng-http-loader';
import { combineLatest, debounceTime, forkJoin, Observable, of } from 'rxjs';
import { MovieService } from '../movie.service';
import { SpinnerVisibilityService } from 'ng-http-loader';

interface Movie {
  title: string;
  poster: string;
  rating: number;
}

@Component({
  selector: 'app-existinguser',
  templateUrl: './existinguser.component.html',
  styleUrls: ['./existinguser.component.css']
})
export class ExistinguserComponent implements OnInit {
  users$ = new Observable<any>();
  baseUrl = this.movieService.baseUrl;
  moviesinfo:Movie[];
  recommendations:Observable<any>;
  mostWatchedMovies:Observable<any>;
  watchedByUser:Observable<any>;

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
  recommendationTypes: string[] = [
    "Similar Movie", 
    "Collaborative Filtering", 
    "Collab Filter NN"
  ];
  filteredItems: string[] = [];
  spinnerStyle = Spinkit;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private movieService: MovieService,
    private spinner: SpinnerVisibilityService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      userid:[null,[Validators.required, Validators.min, Validators.max, Validators.maxLength]],
      recommendationtype: ['', Validators.required],
      moviename: ['', Validators.required],
      numberofrecommendations: [20, Validators.required]
    });
    this.getMoviesInfo();
    this.form.get('moviename')?.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(value => {
      this.search(value);
    });
    this.getMostWatchedMovies();
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
      if (value !== 'Collaborative Filtering' && value !== 'Collab Filter NN') {
        this.form.get('userid')?.clearValidators();
        this.form.get('userid')?.reset();
        this.form.get('userid')?.setErrors(null)
        this.form.get('userid')?.updateValueAndValidity();
      } else {
        this.form.get('userid')?.setValidators([Validators.required]);
        this.form.get('userid')?.updateValueAndValidity();
      }
    });
  }


  search(keyword: string) {
    if (keyword !== '') {
      this.suggestions = this.moviesinfo.filter(s => s.title.toLowerCase().includes(keyword?.toLowerCase()));
    }
  }


  onSelect(item: string) {
    this.form.patchValue({ search: item });
    this.filteredItems = [];
  }

  getMoviesInfo() {
    this.http.get(this.baseUrl + '/getMoviesInfo').subscribe((data: any) => {
      this.moviesinfo = data.moviesinfo
    });
  }

  getMostWatchedMovies() {
    this.movieService.getMostWatched().subscribe(data=>{
      this.mostWatchedMovies = of(data)
    })
  }

  recommendMovies() {
    const data = this.form.getRawValue();
    this.spinner.show();
    if (data.recommendationtype === 'Similar Movie') {
      this.movieService.getSimilarMovies(data.moviename, data.numberofrecommendations).subscribe(data=>{
        this.recommendations = of(data)
        this.spinner.hide();
      })
    } else if (data.recommendationtype === 'Collaborative Filtering') {
      // forkJoin([this.movieService.getMoviesByCollabFiltering(data.userid, data.numberofrecommendations), this.movieService.getMoviesWatchedByUser(data.userid)]).subscribe(data=>{
      //   this.recommendations = of(data[0])
      //   this.watchedByUser = of(data[1])
      //   this.spinner.hide();
      // });
      this.movieService.getMoviesByCollabFiltering(data.userid, data.numberofrecommendations).subscribe(data=>{
        this.recommendations = of(data)
        this.spinner.hide();
      });
    } else if (data.recommendationtype === 'Collab Filter NN') {
      this.movieService.getRecommendationsFromNN(data.userid, data.numberofrecommendations).subscribe(data=>{
        this.recommendations = of(data)
        this.spinner.hide();
      });
      // forkJoin([this.movieService.getRecommendationsFromNN(data.userid, data.numberofrecommendations), this.movieService.getMoviesWatchedByUser(data.userid)]).subscribe(data=>{
      //   this.recommendations = of(data[0])
      //   this.watchedByUser = of(data[1])
      //   this.spinner.hide();
      // });
    }
  }



}
