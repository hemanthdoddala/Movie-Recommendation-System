import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Observable, of } from 'rxjs';
import { MovieService } from '../movie.service';

interface Movie {
  title: string;
  poster: string;
  rating: number;
}

interface MovieInfo {
  movie_id: string;
  poster: string;
  title: string;
}

@Component({
  selector: 'app-existinguser',
  templateUrl: './existinguser.component.html',
  styleUrls: ['./existinguser.component.css']
})
export class ExistinguserComponent implements OnInit {
  users$ = new Observable<any>();
  // baseUrl = 'http://18.212.243.69:80';
  baseUrl = this.movieService.baseUrl;
  moviesinfo:MovieInfo[];
  movies: Movie[] = [];
  movies2: Movie[] = [];

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

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      userid:[null, Validators.required, Validators.min, Validators.max, Validators.maxLength],
      recommendationtype: ['', Validators.required],
      moviename: ['', Validators.required]
    });
    this.getSampleMessage();
    // this.getUsers();
    this.getMoviesInfo()
    this.form.get('moviename')?.valueChanges.pipe(
      debounceTime(1000) // wait 300ms after each keystroke
    ).subscribe(value => {
      this.search(value);
    });
  }


  search(keyword: string) {
    if (keyword !== '') {
      this.suggestions = this.moviesinfo.filter(s => s.title.toLowerCase().includes(keyword.toLowerCase()));
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
      console.log(data.moviesinfo);
      this.movies=data.moviesinfo.slice(0,20)
      this.movies2 = data.moviesinfo.slice(40,60)
    });
  }

}
