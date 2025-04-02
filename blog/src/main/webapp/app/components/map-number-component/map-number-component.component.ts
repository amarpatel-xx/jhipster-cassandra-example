import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../shared/material.module';
import { EditNumberDialogComponent } from '../edit-number-dialog-component/edit-number-dialog-component.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-map-number-component',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, EditNumberDialogComponent],
  templateUrl: './map-number-component.component.html',
  styleUrls: ['./map-number-component.component.css'],
})
export class MapNumberComponent implements OnChanges {
  @Input() inputFields: Record<string, number> = {};
  @Output() dataChange = new EventEmitter<Record<string, number>>();

  mapDetails: Record<string, number> = {};

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      newKey: ['', Validators.required],
      newValue: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (changes.inputFields && this.inputFields) {
      this.mapDetails = { ...this.inputFields };
    }
  }

  openEditNumberDialog(key: string, value: number): void {
    const dialogRef = this.dialog.open(EditNumberDialogComponent, {
      width: '500px',
      height: '300px',
      maxHeight: '90vh',
      data: { key, value },
    });

    dialogRef.afterClosed().subscribe(result => {
      const parsed = parseFloat(result);
      if (!isNaN(parsed)) {
        this.mapDetails[key] = parsed;
        this.emitData();
      }
    });
  }

  addNewRow(): void {
    if (this.form.valid) {
      const { newKey, newValue } = this.form.value;
      const parsedValue = parseFloat(newValue);
      if (!isNaN(parsedValue)) {
        this.mapDetails[newKey.trim()] = parsedValue;
        this.form.reset();
        this.emitData();
      }
    }
  }

  deleteRow(key: string): void {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.mapDetails[key];
    this.emitData();
  }

  private emitData(): void {
    this.dataChange.emit({ ...this.mapDetails });
  }
}
