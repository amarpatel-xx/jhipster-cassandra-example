import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDayjsComponent } from './map-dayjs-component.component';

describe('MapDayjsComponent', () => {
  let component: MapDayjsComponent;
  let fixture: ComponentFixture<MapDayjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapDayjsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MapDayjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
