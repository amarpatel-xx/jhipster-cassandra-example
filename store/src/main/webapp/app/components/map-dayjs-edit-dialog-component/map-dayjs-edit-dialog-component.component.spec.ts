import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDayjsEditDialogComponent } from './map-dayjs-edit-dialog-component.component';

describe('MapDayjsEditDialogComponent', () => {
  let component: MapDayjsEditDialogComponent;
  let fixture: ComponentFixture<MapDayjsEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapDayjsEditDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MapDayjsEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
