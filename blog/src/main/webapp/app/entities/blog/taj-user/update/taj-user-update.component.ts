import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { MaterialModule } from 'app/shared/material.module';

import { v4 as uuidv4 } from 'uuid'; // Import UUID (UUID v4)
import { ITajUser } from '../taj-user.model';
import { TajUserService } from '../service/taj-user.service';
import { TajUserFormGroup, TajUserFormService } from './taj-user-form.service';

@Component({
  standalone: true,
  selector: 'jhi-taj-user-update',
  templateUrl: './taj-user-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule, MaterialModule],
})
export class TajUserUpdateComponent implements OnInit {
  isSaving = false;
  // Saathratri:
  isNew = false;

  tajUser: ITajUser | null = null;

  protected tajUserService = inject(TajUserService);
  protected tajUserFormService = inject(TajUserFormService);
  protected activatedRoute = inject(ActivatedRoute);
  protected router = inject(Router);

  protected isResetDisabled: Record<string, boolean> = {}; // Track reset button states
  // eslint-disable-next-line @typescript-eslint/member-ordering
  private lastSavedValues: Record<string, any> = {}; // Store last valid values

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TajUserFormGroup = this.tajUserFormService.createTajUserFormGroup();

  ngOnInit(): void {
    this.isNew = this.activatedRoute.snapshot.routeConfig?.path === 'new' ? true : false;
    this.activatedRoute.data.subscribe(({ tajUser }) => {
      this.tajUser = tajUser;
      if (tajUser) {
        this.updateForm(tajUser);
      } else {
        this.initializeResetButtonStates();
      }
    });

    // Listen for changes to enable/disable reset button
    Object.keys(this.editForm.controls).forEach(field => {
      this.editForm.get(field)?.valueChanges.subscribe(() => {
        this.isResetDisabled[field] = true; // Disable reset button on load
        this.updateResetButtonState(field);
      });
    });
  }

  previousState(): void {
    this.router.navigate(['/blog/taj-user']);
  }

  save(): void {
    this.isSaving = true;
    const tajUser = this.tajUserFormService.getTajUser(this.editForm);

    // Update the last saved values when saving
    Object.keys(this.editForm.controls).forEach(field => {
      this.lastSavedValues[field] = this.editForm.get(field)?.value;
    });

    // Single-value Primary Key
    if (this.isNew) {
      this.subscribeToSaveResponse(this.tajUserService.create(tajUser));
    } else {
      this.subscribeToSaveResponse(this.tajUserService.update(tajUser));
    }
  }

  // Generate a new UUID and update the form
  generateUUID(field: string): void {
    const newUUID = uuidv4();
    this.editForm.get(field)?.setValue(newUUID);
    this.updateResetButtonState(field);
  }

  // Clear the TimeUUID field
  reset(field: string): void {
    const lastValue = this.lastSavedValues[field];
    const currentValue = this.editForm.get(field)?.value;

    // Only reset if the value has changed
    if (currentValue !== lastValue) {
      this.editForm.get(field)?.setValue(lastValue, { emitEvent: false });
    }

    // Ensure reset button gets disabled after restoring the previous value
    this.updateResetButtonState(field);
  }

  updateResetButtonState(field: string): void {
    const lastValue = this.lastSavedValues[field];
    const currentValue = this.editForm.get(field)?.value;

    if (currentValue === null) {
      this.isResetDisabled[field] = true; // Disable if null
    } else {
      this.isResetDisabled[field] = currentValue === lastValue; // Disable if unchanged
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITajUser>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(tajUser: ITajUser): void {
    this.tajUser = tajUser;
    this.tajUserFormService.resetForm(this.editForm, tajUser);

    Object.keys(this.editForm.controls).forEach(field => {
      this.lastSavedValues[field] = this.editForm.get(field)?.value;
    });
  }

  protected initializeResetButtonStates(): void {
    Object.keys(this.editForm.controls).forEach(field => {
      const control = this.editForm.get(field);

      // Handle nested composite keys
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(nestedField => {
          this.updateResetButtonState(`.${nestedField}`);
        });
      } else {
        this.updateResetButtonState(field);
      }
    });
  }
}
