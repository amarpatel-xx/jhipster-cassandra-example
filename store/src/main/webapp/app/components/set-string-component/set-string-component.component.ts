import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../shared/material.module';
import { SetStringEditDialogComponent } from '../set-string-edit-dialog-component/set-string-edit-dialog-component.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-set-string-component',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './set-string-component.component.html',
  styleUrls: ['./set-string-component.component.css'],
})
export class SetStringComponent {
  @Input() inputFields: Set<string> = new Set<string>();
  @Output() dataChange = new EventEmitter<Set<string>>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      fields: this.fb.array([]),
    });

    this.populateFormArray();
  }

  get fields(): FormArray {
    return this.form.get('fields') as FormArray;
  }

  ngOnChanges(): void {
    this.populateFormArray();
  }

  populateFormArray(): void {
    this.fields.clear();
    Array.from(this.inputFields).forEach(value => {
      this.fields.push(new FormControl(value, Validators.required));
    });
  }

  addInputField(): void {
    if (this.fields.valid) {
      this.fields.push(new FormControl('', Validators.required));
    }
  }

  removeInputField(index: number): void {
    this.fields.removeAt(index);
    this.emitChange();
  }

  openEditDialog(index: number): void {
    const currentValue = this.fields.at(index).value;
    const dialogRef = this.dialog.open(SetStringEditDialogComponent, {
      width: '400px',
      height: '250px',
      data: { value: currentValue },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result.trim() !== '') {
        this.fields.at(index).setValue(result.trim());
        this.emitChange();
      }
    });
  }

  getFormControl(index: number): FormControl {
    return this.fields.at(index) as FormControl;
  }

  private emitChange(): void {
    this.dataChange.emit(new Set(this.fields.value));
  }
}
