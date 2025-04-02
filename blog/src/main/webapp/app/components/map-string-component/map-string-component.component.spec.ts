import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapStringComponent } from './map-string-component.component';

describe('MapStringComponent', () => {
  let component: MapStringComponent;
  let fixture: ComponentFixture<MapStringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapStringComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MapStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
