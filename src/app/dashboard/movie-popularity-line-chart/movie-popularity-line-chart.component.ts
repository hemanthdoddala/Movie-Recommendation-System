import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/movie.service';
import * as ApexCharts from 'apexcharts';
import { animate } from '@angular/animations';

@Component({
  selector: 'app-movie-popularity-line-chart',
  templateUrl: './movie-popularity-line-chart.component.html',
  styleUrls: ['./movie-popularity-line-chart.component.css']
})
export class MoviePopularityLineChartComponent implements OnInit {

  movies:any[]
  selectedMovie:string;
  moviePopularity:any

  constructor(
    private movieService:MovieService
  ) {
  }

  ngOnInit(): void {
      this.movieService.getMostWatched().subscribe(data=>{
        this.movies = data
        this.getMoviePopularity(this.movies[0].title)
      });
  }

  getMoviePopularity(moviename:string, initial?:number) {
    this.movieService.getMoviePopularity(moviename).subscribe((data)=>{
      this.selectedMovie = moviename
      this.moviePopularity = data
      this.chartOptions(initial)
    })
  }

  chartOptions(initial?:number): any {
    let options = {
      series: [{
        name: "Ratings",
        data: this.moviePopularity.popularity
    }],
      chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: this.moviePopularity.years,
    }
    };
    let chart = new ApexCharts(document.querySelector("#movie-line-chart"), options);
    // if (initial){
    //   chart.updateSeries([{
    //     name:"Ratings",
    //     data: this.moviePopularity.popularity
    //   }], true)
    // }
    chart.render();
    chart.resetSeries()
  }

}
