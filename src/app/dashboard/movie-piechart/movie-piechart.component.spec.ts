import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePiechartComponent } from './movie-piechart.component';

describe('MoviePiechartComponent', () => {
  let component: MoviePiechartComponent;
  let fixture: ComponentFixture<MoviePiechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviePiechartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviePiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
