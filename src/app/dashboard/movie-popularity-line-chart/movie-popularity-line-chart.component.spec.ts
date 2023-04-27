import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePopularityLineChartComponent } from './movie-popularity-line-chart.component';

describe('MoviePopularityLineChartComponent', () => {
  let component: MoviePopularityLineChartComponent;
  let fixture: ComponentFixture<MoviePopularityLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviePopularityLineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviePopularityLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
