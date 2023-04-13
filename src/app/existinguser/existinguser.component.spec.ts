import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistinguserComponent } from './existinguser.component';

describe('ExistinguserComponent', () => {
  let component: ExistinguserComponent;
  let fixture: ComponentFixture<ExistinguserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistinguserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistinguserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
