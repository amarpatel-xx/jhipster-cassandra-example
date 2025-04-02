import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNumberDialogComponent } from './edit-number-dialog-component.component';

describe('EditNumberDialogComponent', () => {
  let component: EditNumberDialogComponent;
  let fixture: ComponentFixture<EditNumberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNumberDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditNumberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
