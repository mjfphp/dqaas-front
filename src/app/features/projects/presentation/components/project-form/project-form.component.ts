import { Component, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { projectsActions } from '../../../application/projects.actions';
import { Project } from '../../../domain/types/project.type';
import { modalActions } from '../../../../../shared/modal/application/modal.actions';
import { ModalType } from '../../../../../shared/modal/domain/enums/modal-type.enum';
import { emailListValidator } from '../../../domain/functions/emails-list-validator.function';
import { sha256 } from '../../../domain/functions/sha256.function';

@Component({
  selector: 'project-form',
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzTagModule,
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProjectFormComponent {

  readonly selectedProject: Project = inject(NZ_MODAL_DATA);

  protected projectForm = this._formBuilder.group({
    name: [this.selectedProject?.name || null, [Validators.required]],
    description: [this.selectedProject?.description || null, [Validators.required]],
    code: [''],
    members_emails: [this.selectedProject?.members_emails || [], [emailListValidator()]],
  });

  constructor(private readonly _store: Store,
    private readonly _formBuilder: FormBuilder) { }

  onSubmit(): void {

  const dateNow = new Date().toJSON().slice(0,10).replace(/-/g,'');
    if (this.projectForm.valid) {

      let project: Project = {
        name: this.projectForm.value.name!,
        description: this.projectForm.value.description!,
        code: sha256(this.projectForm.value.name! + dateNow).substring(0, 10),// Limiter à 10
        members_emails: this.projectForm.value.members_emails ?? [],
      };
      
      this._store.dispatch(modalActions.updateState({
        id: ModalType.projectForm,
        data: this.projectForm.value,
        isLoading: true,
      }));

      this._store.dispatch(projectsActions.createProject({ project }));

    } else {
      // Display error messages for invalid fields
      Object.values(this.projectForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }

  }

  getEmailErrorList(): string {
    const control = this.projectForm.get('members_emails');
    if (control?.errors?.['invalidEmails']) {
      return control.errors?.['invalidEmails'].join(', ');
    }
    return '';
  }

}
