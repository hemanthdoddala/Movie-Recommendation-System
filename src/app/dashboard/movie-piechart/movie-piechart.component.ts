import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'app-movie-piechart',
  templateUrl: './movie-piechart.component.html',
  styleUrls: ['./movie-piechart.component.css']
})
export class MoviePiechartComponent implements OnInit {

  constructor(
    private movieService: MovieService
  ) {
  }

  ngOnInit(): void {
    this.movieService.getMovieRatingPieChart().subscribe(res => {
      console.log("pie chart")
      console.log(res)
      const options = {
        series: res.map((ele: any) => ele[1]),
        labels: res.map((ele: any) => ele[0]),
        chart: {
          type: 'donut',
          height: 350,
          title: ""
        },
        dataLabels: {
          enabled: true
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        tooltip: {
          y: {
            formatter: function (val: any) {
              return val + " ratings"
            }
          }
        },
        legend: {
          position: 'left',
          offsetY: 0,
          height: 230,
          show: true,
          fontSize: '14px',
          labels: {
            colors: '#333',
          },
          title: {
            text: 'Fruit Distribution',
            style: {
              fontSize: '16px',
              fontWeight: 600,
              color: 'red',
            },
            markers: {
              width: 10,
              height: 10,
              strokeWidth: 0,
              strokeColor: '#fff',
              fillColors: undefined,
              radius: 12,
            },
          }
        }
      };
      const chart = new ApexCharts(document.querySelector("#movie-piechart"), options);
      chart.render();
    });
  }

}
