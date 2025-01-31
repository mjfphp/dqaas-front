import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { combineLatest, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { SortFormComponent } from '../../../../../shared/sort/presentation/sort-form/sort-form.component';
import { SortOption } from '../../../../../shared/sort/domain/types/sort-option.type';
import { PageName } from '../../../../../shared/sort/domain/enums/page-name.enum';
import { selectProjectsPageSortConfig } from '../../../../../shared/sort/application/selectors/project-sort-config.selectors';
import { projectsActions } from '../../../application/projects.actions';
import { SortOrder } from '../../../../../shared/sort/domain/enums/sort-order.enum';
import { selectIsLoadingProjects, selectProject, selectProjectsList } from '../../../application/projects.feature';
import { ProjectFormComponent } from '../../components/project-form/project-form.component';
import { ModalService } from '../../../../../shared/modal/domain/services/modal.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ModalType } from '../../../../../shared/modal/domain/enums/modal-type.enum';
import { modalActions } from '../../../../../shared/modal/application/modal.actions';
import { selectModalOpened } from '../../../../../shared/modal/application/selectors/modal.selectors';
import { searchActions } from '../../../../../shared/search/application/search.actions';
import { selectProjectsPageSearchParams } from '../../../../../shared/search/application/selectors/project-search-params.selectors';
import { SearchParams } from '../../../../../shared/search/domain/types/search-params.type';
import { Project } from '../../../domain/types/project.type';

@Component({
  selector: 'app-projects-list-page',
  imports: [
    RouterLink,
    NgFor,
    NgIf,
    AsyncPipe,
    ProjectCardComponent,
    SortFormComponent,
    NzGridModule,
    NzFlexModule,
    NzCardModule,
    NzDescriptionsModule,
    NzBadgeModule,
    NzIconModule,
    NzAvatarModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzSpaceModule,
    NzButtonModule,
    NzEmptyModule,
    NzSpinModule,
  ],
  templateUrl: './projects-list-page.component.html',
  styleUrl: './projects-list-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProjectsListPageComponent implements OnInit {

  protected modalType = ModalType.projectForm;
  protected createProjectModalRef: NzModalRef | undefined;
  protected editProjectModalRef: NzModalRef | undefined;

  protected isProjectModalOpened$ = this._store.select(selectModalOpened(this.modalType));

  protected isLoadingProjects$ = this._store.select(selectIsLoadingProjects);
  protected projects$ = this._store.select(selectProjectsList);
  protected project$ = this._store.select(selectProject);

  protected sortConfig$ = this._store.select(selectProjectsPageSortConfig);
  protected searchParams$ = this._store.select(selectProjectsPageSearchParams);

  protected pageName = PageName.projectsPage;
  protected sortOptions: SortOption[] = [
    { label: 'Nom', value: 'name', isDefault: true },
    { label: 'Description', value: 'description' },
    { label: 'Code', value: 'code' },
    { label: 'Date de création', value: 'created_at' },
  ];

  constructor(private readonly _store: Store,
    private readonly _modalService: ModalService,
    private readonly _viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {

    // Handler to get the page's sort, pagination and filters params
    combineLatest([this.sortConfig$]).pipe(
      tap(([sortConfig]) => {
        this._store.dispatch(searchActions.updatePageSearchParams({
          pageSearch: {
            pageName: this.pageName,
            searchParams: {
              pageIndex: 0,
              pageSize: 10,
              sort: sortConfig ?? {
                field: this.sortOptions[0].value,
                order: SortOrder.ascend,
              },
              filters: [],
            }
          }
        }));
      })).subscribe();

    // Handler to get the page's search params
    this.searchParams$.subscribe(searchParams => {
      this.loadProjects(searchParams);
    });

    // Handler to open/close Create Project modal
    this.isProjectModalOpened$.subscribe(isOpened => {
      if (isOpened) {
        this.createProjectModalRef = this.openCreateProjectModal();
      } else {
        this.createProjectModalRef?.destroy();
      }
    });

    // Handler to open Edit Project modal
    this.project$.subscribe(project => {
      if (project)
        this.editProjectModalRef = this.openEditProjectModal(project);
    });

  }

  loadProjects(searchParams: SearchParams | undefined) {
    this._store.dispatch(projectsActions.loadProjects({
      searchParams: {
        pageIndex: searchParams?.pageIndex || 0,
        pageSize: searchParams?.pageSize || 10,
        sort: searchParams?.sort ?? {
          field: this.sortOptions[0].value,
          order: SortOrder.ascend,
        },
        filters: searchParams?.filters || [],
      }
    }));
  }

  onCreate(): void {
    this._store.dispatch(modalActions.openCreateProjectModal());
  }

  openCreateProjectModal(): NzModalRef {
    const createModalRef: NzModalRef = this._modalService.createComponentModal<ProjectFormComponent>({
      type: this.modalType,
      viewContainerRef: this._viewContainerRef,
      title: 'Nouveau projet',
      content: ProjectFormComponent,
      onOk: () => (createModalRef.getContentComponent() as ProjectFormComponent).onSubmit(),
      onCancel: () => {
        this._store.dispatch(modalActions.close({ id: this.modalType }));
        createModalRef.destroy();
      },
    });

    return createModalRef;
  }

  onEditProject(id: string): void {
    this._store.dispatch(projectsActions.loadProject({ id }));
  }

  openEditProjectModal(project: Project): NzModalRef {
    const editModalRef: NzModalRef = this._modalService.createComponentModal<ProjectFormComponent>({
      type: this.modalType,
      viewContainerRef: this._viewContainerRef,
      title: project.name,
      data: project,
      content: ProjectFormComponent,
      onOk: () => (editModalRef.getContentComponent() as ProjectFormComponent).onSubmit(),
      onCancel: () => {
        this._store.dispatch(modalActions.close({ id: this.modalType }));
        editModalRef.destroy();
      },
    });

    return editModalRef;
  }

  onDeleteProject(id: string): void {
    this._store.dispatch(projectsActions.deleteProject({ id }));
  }

}
