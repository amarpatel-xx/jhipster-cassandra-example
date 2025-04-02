import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-set-component',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './set-component.component.html',
  styleUrls: ['./set-component.component.css'],
})
export class SetComponent {
  @Input() inputFields: Set<string> = new Set<string>();
  @Output() dataChange = new EventEmitter<Set<string>>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fields: this.fb.array([]), // ✅ Reactive FormArray
    });

    this.populateFormArray(); // ✅ Populate FormArray with inputFields
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
    const newValue = prompt('Edit Field:', currentValue);
    if (newValue !== null && newValue.trim() !== '') {
      this.fields.at(index).setValue(newValue.trim());
      this.emitChange();
    }
  }

  getFormControl(index: number): FormControl {
    return this.fields.at(index) as FormControl;
  }

  private emitChange(): void {
    this.dataChange.emit(new Set(this.fields.value));
  }
}
