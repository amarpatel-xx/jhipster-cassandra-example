import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../shared/material.module';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-edit-string-dialog-component',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, MatDialogModule], // ✅ Use ReactiveFormsModule
  templateUrl: './edit-string-dialog-component.component.html',
  styleUrls: ['./edit-string-dialog-component.component.css'],
})
export class EditStringDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditStringDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { key: string; value: string },
  ) {
    this.form = new FormGroup({
      key: new FormControl({ value: data.key, disabled: true }), // ✅ Read-only key
      value: new FormControl(data.value, Validators.required), // ✅ Required value field
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
}
