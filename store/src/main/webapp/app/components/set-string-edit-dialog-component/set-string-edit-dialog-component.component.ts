import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../shared/material.module';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-set-string-edit-dialog-component',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './set-string-edit-dialog-component.component.html',
  styleUrls: ['./set-string-edit-dialog-component.component.css'],
})
export class SetStringEditDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SetStringEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { value: string },
  ) {
    this.form = new FormGroup({
      value: new FormControl(data.value, Validators.required),
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
