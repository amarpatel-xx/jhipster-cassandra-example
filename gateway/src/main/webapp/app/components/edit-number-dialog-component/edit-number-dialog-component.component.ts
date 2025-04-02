import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../shared/material.module';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-edit-number-dialog-component',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './edit-number-dialog-component.component.html',
  styleUrls: ['./edit-number-dialog-component.component.css'],
})
export class EditNumberDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditNumberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { key: string; value: number },
  ) {
    this.form = new FormGroup({
      key: new FormControl({ value: data.key, disabled: true }), // ✅ Read-only key
      value: new FormControl(data.value, [
        Validators.required,
        Validators.pattern(/^-?\d+(\.\d+)?$/), // ✅ Ensure it's a valid number
      ]),
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      const numericValue = parseFloat(this.form.get('value')?.value);
      if (!isNaN(numericValue)) {
        this.dialogRef.close(numericValue);
      }
    }
  }
}
