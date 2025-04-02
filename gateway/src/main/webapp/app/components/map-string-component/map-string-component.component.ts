import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../shared/material.module';
import { EditStringDialogComponent } from '../edit-string-dialog-component/edit-string-dialog-component.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-map-string-component',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, EditStringDialogComponent],
  templateUrl: './map-string-component.component.html',
  styleUrls: ['./map-string-component.component.css'],
})
export class MapStringComponent implements OnChanges {
  @Input() inputFields: Record<string, string> = {};
  @Output() dataChange = new EventEmitter<Record<string, string>>();

  mapDetails: Record<string, string> = {};

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      newKey: ['', Validators.required],
      newValue: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (changes.inputFields && this.inputFields) {
      this.mapDetails = { ...this.inputFields };
    }
  }

  openEditStringDialog(key: string, value: string): void {
    const dialogRef = this.dialog.open(EditStringDialogComponent, {
      width: '500px',
      height: '300px',
      maxHeight: '90vh',
      data: { key, value },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.mapDetails[key] = result;
        this.emitData();
      }
    });
  }

  addNewRow(): void {
    if (this.form.valid) {
      const { newKey, newValue } = this.form.value;
      this.mapDetails[newKey.trim()] = newValue?.trim() || '';
      this.form.reset();
      this.emitData();
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
