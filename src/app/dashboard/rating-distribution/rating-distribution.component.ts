import { Component } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { Spinkit } from 'ng-http-loader';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'app-rating-distribution',
  templateUrl: './rating-distribution.component.html',
  styleUrls: ['./rating-distribution.component.css']
})
export class RatingDistributionComponent {
  spinnerStyle = Spinkit;
  constructor(
    private movieService: MovieService,
    ) { }

  ngOnInit() {
    this.movieService.getRatingDistribution().subscribe((data: any[]) => {
      const options = {
        series: [
          {
            name:"",
            data: data,
          },
        ],
        chart: {
          type: 'bar',
          height: 350,
          title:"Rating Distribution"
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'],
          title: {
            text: 'Rating'
          }
        },
        yaxis: {
          title: {
            text: 'Number of Ratings'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val: any) {
              return val + " ratings"
            }
          }
        }
      };
      const chart = new ApexCharts(document.querySelector("#rating-dist"), options);
      chart.render();
    });
  }
}
