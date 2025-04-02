import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../shared/material.module';
import { EditBooleanDialogComponent } from '../edit-boolean-dialog-component/edit-boolean-dialog-component.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-map-boolean-component',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, EditBooleanDialogComponent],
  templateUrl: './map-boolean-component.component.html',
  styleUrls: ['./map-boolean-component.component.css'],
})
export class MapBooleanComponent implements OnInit, OnChanges {
  @Input() inputFields: Record<string, boolean> = {};
  @Output() dataChange = new EventEmitter<Record<string, boolean>>();

  mapDetails: Record<string, boolean> = {};
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      fields: this.fb.array([]),
      newKey: ['', Validators.required],
      newValue: [null, Validators.required],
    });
  }

  get formArray(): FormArray {
    return this.form.get('fields') as FormArray;
  }

  ngOnInit(): void {
    // Disable all value fields in read-only mode
    this.disableAllValueFields();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (changes.inputFields && this.inputFields) {
      this.mapDetails = { ...this.inputFields };
      this.populateFormArray();
    }
  }

  populateFormArray(): void {
    this.formArray.clear();
    Object.entries(this.mapDetails).forEach(([key, value]) => {
      const group = this.fb.group({
        key: [key],
        value: [value, Validators.required],
      });
      group.get('value')?.disable(); // Disable value field on init
      this.formArray.push(group);
    });
  }

  disableAllValueFields(): void {
    this.formArray.controls.forEach(controlGroup => {
      controlGroup.get('value')?.disable();
    });
  }

  getFormControl(index: number, controlName: string): FormControl {
    return this.formArray.at(index).get(controlName) as FormControl;
  }

  openEditBooleanDialog(index: number): void {
    const keyControl = this.getFormControl(index, 'key');
    const valueControl = this.getFormControl(index, 'value');

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!keyControl || !valueControl) return;

    const key = keyControl.value;
    const currentValue = valueControl.value;

    const dialogRef = this.dialog.open(EditBooleanDialogComponent, {
      width: '500px',
      height: '300px',
      maxHeight: '90vh',
      data: { key, value: currentValue },
    });

    dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if (typeof result === 'boolean') {
        valueControl.setValue(result); // update the form control
        this.mapDetails[key] = result; // update internal map
        this.emitData(); // notify parent
      }
    });
  }

  addNewRow(): void {
    if (this.form.valid) {
      const { newKey, newValue } = this.form.value;
      const trimmedKey = newKey.trim();
      const group = this.fb.group({
        key: [trimmedKey],
        value: [newValue, Validators.required],
      });
      group.get('value')?.disable(); // Disable the newly added row
      this.mapDetails[trimmedKey] = newValue;
      this.formArray.push(group);
      this.form.reset({ newKey: '', newValue: null });
      this.emitData();
    }
  }

  deleteRow(index: number): void {
    const field = this.formArray.at(index).value;
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.mapDetails[field.key];
    this.formArray.removeAt(index);
    this.emitData();
  }

  resetSelection(): void {
    this.form.get('newValue')?.setValue(null);
  }

  private emitData(): void {
    this.dataChange.emit({ ...this.mapDetails });
  }
}
