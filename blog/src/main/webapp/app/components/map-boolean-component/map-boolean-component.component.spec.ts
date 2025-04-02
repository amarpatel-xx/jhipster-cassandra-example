import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapBooleanComponent } from './map-boolean-component.component';

describe('MapBooleanComponent', () => {
  let component: MapBooleanComponent;
  let fixture: ComponentFixture<MapBooleanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapBooleanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MapBooleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
