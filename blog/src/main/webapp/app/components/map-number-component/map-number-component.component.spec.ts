import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapNumberComponent } from './map-number-component.component';

describe('MapNumberComponent', () => {
  let component: MapNumberComponent;
  let fixture: ComponentFixture<MapNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapNumberComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MapNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
