import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'app-genre-treemap',
  templateUrl: './genre-treemap.component.html',
  styleUrls: ['./genre-treemap.component.css']
})
export class GenreTreemapComponent implements OnInit {
  constructor(
    private movieService:MovieService
  ) {
   }

  ngOnInit() {
    this.movieService.getGenreTreemap().subscribe((res:any)=>{
      console.log(res)
      const options = {
        series: [
          {
            data:res
          }
        ],
        chart: {
          height: 350,
          type: 'treemap'
        },
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false
          }
        }
      };
      const chart = new ApexCharts(document.querySelector("#tree-map"), options);
      chart.render();
    })
  }

}
