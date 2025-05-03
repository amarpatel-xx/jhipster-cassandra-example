import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapStringEditDialogComponent } from './map-string-edit-dialog-component.component';

describe('MapStringEditDialogComponent', () => {
  let component: MapStringEditDialogComponent;
  let fixture: ComponentFixture<MapStringEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapStringEditDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MapStringEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
