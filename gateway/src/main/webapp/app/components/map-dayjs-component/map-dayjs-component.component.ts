import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import dayjs from 'dayjs/esm';
import { MaterialModule } from '../../shared/material.module';
import { EditDayjsDialogComponent } from '../edit-dayjs-dialog-component/edit-dayjs-dialog-component.component';
import { DateTimeComponent } from '../date-time/date-time.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-map-dayjs-component',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, EditDayjsDialogComponent, DateTimeComponent],
  templateUrl: './map-dayjs-component.component.html',
  styleUrls: ['./map-dayjs-component.component.css'],
})
export class MapDayjsComponent implements OnChanges {
  @Input() inputFields: Record<string, dayjs.Dayjs> = {};
  @Output() dataChange = new EventEmitter<Record<string, dayjs.Dayjs>>();

  mapDetails: Record<string, dayjs.Dayjs> = {};
  isDateTimeValid: Record<string, boolean> = {};
  isDateTimeDirty: Record<string, boolean> = {};

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      newKey: ['', Validators.required],
      newValue: [null, Validators.required],
    });
  }

  getControlForEntry(entry: any): FormControl {
    return this.fb.control(entry.value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (changes.inputFields && this.inputFields) {
      this.mapDetails = { ...this.inputFields };
    }
  }

  openEditDayjsDialog(key: string, value: dayjs.Dayjs): void {
    const dialogRef = this.dialog.open(EditDayjsDialogComponent, {
      width: '500px',
      height: '300px',
      maxHeight: '90vh',
      data: { key, value },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mapDetails[key] = dayjs(result);
        this.emitData();
      }
    });
  }

  addNewRow(): void {
    if (this.form.valid) {
      const { newKey, newValue } = this.form.value;
      this.mapDetails[newKey.trim()] = dayjs(newValue);
      this.form.reset();
      this.emitData();
    }
  }

  deleteRow(key: string): void {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.mapDetails[key];
    this.emitData();
  }

  onDateTimeValid(controlName: string, isValid: boolean): void {
    this.isDateTimeValid[controlName] = isValid;
  }

  updateDirtyState(event: { field: string; isDirty: boolean }): void {
    this.isDateTimeDirty[event.field] = event.isDirty;
  }

  private emitData(): void {
    this.dataChange.emit({ ...this.mapDetails });
  }
}
