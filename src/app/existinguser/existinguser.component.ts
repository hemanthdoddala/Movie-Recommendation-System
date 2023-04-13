import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, of, startWith } from 'rxjs';

interface Movie {
  name: string;
  poster: string;
  rating: number;
}

@Component({
  selector: 'app-existinguser',
  templateUrl: './existinguser.component.html',
  styleUrls: ['./existinguser.component.css']
})
export class ExistinguserComponent {
  users$ = new Observable<any>();
  movies: Movie[] = [
    {
      "poster": "https://image.tmdb.org/t/p/w500/9dKCd55IuTT5QRs989m9Qlb7d2B.jpg",
      "name": "Spider-Man: No Way Home",
      "rating": 8.4
    },
    {
      "poster": "https://image.tmdb.org/t/p/w500/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
      "name": "The Matrix Resurrections",
      "rating": 7.1
    },
    {
      "poster": "https://image.tmdb.org/t/p/w500/xbSuFiJbbBWCkyCCKIMfuDCA4yV.jpg",
      "name": "The King's Man",
      "rating": 7.5
    },
    {
      "poster": "https://image.tmdb.org/t/p/w500/1gTnopPJgauN46CYGobPyZCZQTn.jpg",
      "name": "Sing 2",
      "rating": 7.8
    },
    {
      "poster": "https://image.tmdb.org/t/p/w500/8j58iEBw9pOXFD2L0nt0ZXeHviB.jpg",
      "name": "Dune",
      "rating": 8.1
    },
    {
      "poster": "https://image.tmdb.org/t/p/w500/6Y9fl8tD1xtyUrOHV2MkCYTpzgi.jpg",
      "name": "Don't Look Up",
      "rating": 7.4
    },
    {
      "poster": "https://image.tmdb.org/t/p/w500/3cOnZ3BEptXHoGul3wHO3hJNKR0.jpg",
      "name": "Encanto",
      "rating": 8.3
    },
    {
      "poster": "https://image.tmdb.org/t/p/w500/1e1tUWInXCVrrwY6ntuNRuwEj7P.jpg",
      "name": "Venom: Let There Be Carnage",
      "rating": 6.9
    },
    {
      "poster": "https://image.tmdb.org/t/p/w500/xmbU4JTUm8rsdtn7Y3Fcm30GpeT.jpg",
      "name": "Dune: Part Two",
      "rating": 0
    },
    {
      "poster": "https://image.tmdb.org/t/p/w500/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg",
      "name": "Shang-Chi and the Legend of the Ten Rings",
      "rating": 7.9
    },
    {
      "poster": "https://image.tmdb.org/t/p/w500/niw2AKHz6XmwiRMLWaoyAOAti0G.jpg",
      "name": "Free Guy",
      "rating": 7.8
    },
    {
      "poster": "https://image.tmdb.org/t/p/w500/4q2hz2m8hubgvijz8Ez0T2Os2Yv.jpg",
      "name": "The Suicide Squad",
      "rating": 7.9
    },
    {
      "poster": "https://image.tmdb.org/t/p/w500/uIXF0sQGXOxQhbaEaKOi2VYlIL0.jpg",
      "name": "No Time to Die",
      "rating": 7.5
    },
    {
      "poster": "https://image.tmdb.org/t/p/w500/hRMfgGFRAZIlvwVWy8DYJdLTpvN.jpg",
      "name": "Eternals",
      "rating": 6.9
    },
    {
      "poster": "https://image.tmdb.org/t/p/w500/5bFK5d3mVTAvBCXi5NPWH0tYjKl.jpg",
      "name": "Ghostbusters: Afterlife",
      "rating": 7.9
    }
  ];

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
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      recommendationtype: ['', Validators.required],
      moviename: ['', Validators.required]
    });
    this.getSampleMessage();
    this.getUsers();
  }


  search(keyword: string) {
    if (keyword !== '') {
      this.suggestions = this.movies.filter(s => s.name.toLowerCase().includes(keyword.toLowerCase()));
    }
  }


  onSelect(item: string) {
    this.form.patchValue({ search: item });
    this.filteredItems = [];
  }

  getSampleMessage() {
    this.http.get('http://18.212.243.69:80').subscribe((data: any) => {
      console.log(data);
      console.log("sample data above")
    })
  }

  getUsers() {
    this.http.get('http://18.212.243.69:80/' + 'getUsers').subscribe((data: any) => {
      this.users$ = of(data.users)
      console.log(data.users);
    });
  }

}
