import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { modalActions } from '../../../../../shared/modal/application/modal.actions';
import { authActions } from '../../../application/auth.actions';
import { Modal } from '../../../../../shared/modal/domain/enums/modal.enum';
import { FirstConnection } from '../../../../../core/domain/types/first-connection.type';

@Component({
  selector: 'app-first-connection-form',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule],
  templateUrl: './first-connection-form.component.html',
  styleUrl: './first-connection-form.component.scss'
})
export class FirstConnectionFormComponent {

  protected firstConnectionForm = this._formBuilder.group({
    projectCode: [null, Validators.required],
  });

  constructor(private readonly _store: Store,
    private readonly _formBuilder: FormBuilder) { }

  onSubmit(): void {
    if (this.firstConnectionForm.valid) {
      this._store.dispatch(modalActions.updateState({ id: Modal.firstConnection, data: this.firstConnectionForm.value, isLoading: true }));
      this._store.dispatch(authActions.generateJwt({ firstConnection: this.firstConnectionForm.value as FirstConnection }));
    } else {
      // Display error messages for invalid fields
      Object.values(this.firstConnectionForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
