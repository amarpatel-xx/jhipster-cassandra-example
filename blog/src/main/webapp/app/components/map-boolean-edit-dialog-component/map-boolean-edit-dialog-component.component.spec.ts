import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapBooleanEditDialogComponent } from './edit-boolean-dialog-component.component';

describe('MapBooleanEditDialogComponent', () => {
  let component: MapBooleanEditDialogComponent;
  let fixture: ComponentFixture<MapBooleanEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapBooleanEditDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MapBooleanEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
