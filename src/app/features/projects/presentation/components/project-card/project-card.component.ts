import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { Project } from '../../../domain/types/project.type';
import { Store } from '@ngrx/store';
import { selectDeletedProjectId, selectEditedProjectId, selectIsLoadingProject } from '../../../application/projects.feature';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'project-card',
  imports: [
    AsyncPipe,
    NzCardModule,
    NzIconModule,
    NzAvatarModule,
    NzTypographyModule,
  ],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProjectCardComponent {

  @Input() project!: Project;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  protected isLoadingProject$ = this._store.select(selectIsLoadingProject);
  protected editedProjectId$ = this._store.select(selectEditedProjectId);
  protected deletedProjectId$ = this._store.select(selectDeletedProjectId);

  constructor(private readonly _store: Store) { }

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }

}
