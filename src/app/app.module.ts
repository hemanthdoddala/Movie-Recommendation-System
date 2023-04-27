import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NewuserComponent } from './newuser/newuser.component';
import { ExistinguserComponent } from './existinguser/existinguser.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatOptionModule } from '@angular/material/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { MovieService } from './movie.service';
import { NgChartsModule } from 'ng2-charts';
import { RatingDistributionComponent } from './dashboard/rating-distribution/rating-distribution.component';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { GenreTreemapComponent } from './dashboard/genre-treemap/genre-treemap.component';
import { MoviePiechartComponent } from './dashboard/movie-piechart/movie-piechart.component';
import {MatSliderModule} from '@angular/material/slider';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { MoviePopularityLineChartComponent } from './dashboard/movie-popularity-line-chart/movie-popularity-line-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    NewuserComponent,
    ExistinguserComponent,
    DashboardComponent,
    RatingDistributionComponent,
    GenreTreemapComponent,
    MoviePiechartComponent,
    MoviePopularityLineChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule, 
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    SlickCarouselModule,
    MatOptionModule,
    FlexLayoutModule,
    MatIconModule,
    HttpClientModule,
    MatGridListModule,
    NgChartsModule,
    NgxApexchartsModule,
    MatSelectModule,
    MatSliderModule,
    NgHttpLoaderModule.forRoot(),
  ],
  exports:[],
  providers: [MovieService],
  bootstrap: [AppComponent],
})
export class AppModule { }
