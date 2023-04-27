import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreTreemapComponent } from './genre-treemap.component';

describe('GenreTreemapComponent', () => {
  let component: GenreTreemapComponent;
  let fixture: ComponentFixture<GenreTreemapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreTreemapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreTreemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
