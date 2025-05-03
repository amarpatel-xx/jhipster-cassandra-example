import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetStringEditDialogComponent } from './set-string-edit-dialog-component.component';

describe('SetStringEditDialogComponent', () => {
  let component: SetStringEditDialogComponent;
  let fixture: ComponentFixture<SetStringEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetStringEditDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SetStringEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
