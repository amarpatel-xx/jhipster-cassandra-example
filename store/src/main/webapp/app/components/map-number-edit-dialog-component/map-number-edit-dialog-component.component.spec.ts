import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapNumberEditDialogComponent } from './map-number-edit-dialog-component.component';

describe('MapNumberEditDialogComponent', () => {
  let component: MapNumberEditDialogComponent;
  let fixture: ComponentFixture<MapNumberEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapNumberEditDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MapNumberEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
