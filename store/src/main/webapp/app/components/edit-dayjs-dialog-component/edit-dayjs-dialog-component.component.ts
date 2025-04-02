import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import dayjs from 'dayjs/esm';
import { MaterialModule } from '../../shared/material.module';
import { DateTimeComponent } from '../date-time/date-time.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-edit-dayjs-dialog-component',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, MatDialogModule, DateTimeComponent],
  templateUrl: './edit-dayjs-dialog-component.component.html',
  styleUrls: ['./edit-dayjs-dialog-component.component.css'],
})
export class EditDayjsDialogComponent {
  form: FormGroup;
  isDateTimeValid: Record<string, boolean> = {};
  isDateTimeDirty: Record<string, boolean> = {};

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditDayjsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { key: string; value: dayjs.Dayjs },
  ) {
    this.form = this.fb.group({
      key: [{ value: data.key, disabled: true }, Validators.required],
      value: [data.value, Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.get('value')?.value);
    }
  }

  onDateTimeValid(controlName: string, isValid: boolean): void {
    this.isDateTimeValid[controlName] = isValid;
  }

  updateDirtyState(event: { field: string; isDirty: boolean }): void {
    this.isDateTimeDirty[event.field] = event.isDirty;
  }
}
