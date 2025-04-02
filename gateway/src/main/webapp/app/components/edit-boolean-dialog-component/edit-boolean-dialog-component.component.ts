import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // ✅ Import Slide Toggle
import { MaterialModule } from '../../shared/material.module';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-edit-boolean-dialog-component',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, MatDialogModule, MatSlideToggleModule],
  templateUrl: './edit-boolean-dialog-component.component.html',
  styleUrls: ['./edit-boolean-dialog-component.component.css'],
})
export class EditBooleanDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditBooleanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { key: string; value: boolean },
  ) {
    this.form = new FormGroup({
      key: new FormControl({ value: data.key, disabled: true }), // ✅ Read-only key
      value: new FormControl(data.value, Validators.required), // ✅ Ensure a selection is made
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

  get toggleLabel(): string {
    const value = this.form.get('value')?.value;
    if (value === null) return 'Please select';
    return value ? 'True' : 'False';
  }
}
