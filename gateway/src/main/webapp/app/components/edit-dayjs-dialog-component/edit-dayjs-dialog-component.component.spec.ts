import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDayjsDialogComponent } from './edit-dayjs-dialog-component.component';

describe('EditDayjsDialogComponent', () => {
  let component: EditDayjsDialogComponent;
  let fixture: ComponentFixture<EditDayjsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDayjsDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditDayjsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
