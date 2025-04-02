import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBooleanDialogComponent } from './edit-boolean-dialog-component.component';

describe('EditBooleanDialogComponent', () => {
  let component: EditBooleanDialogComponent;
  let fixture: ComponentFixture<EditBooleanDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBooleanDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditBooleanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
