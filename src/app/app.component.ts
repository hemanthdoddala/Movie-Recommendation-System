import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'movie-recommendation-system';
  showOnlyForAppComponent = true;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {
  }

  openRepo() {
    const url = 'https://github.com/hemanthdoddala/Movie-Recommendation-System#readme'
    window.open(url, '_blank');
  }
}
