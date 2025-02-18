import { Injectable } from '@angular/core';
import { ProjectRepository } from '../../domain/repositories/project.repository';
import { SearchParams } from '../../../../shared/search/domain/types/search-params.type';
import { Observable, concatMap, delay, of, throwError, timer } from 'rxjs';
import { Project } from '../../domain/types/project.type';

@Injectable({
  providedIn: 'root'
})
export class FakeProjectRepositoryImpl implements ProjectRepository {

  private isError: boolean = true;

  private randomDelay = Math.floor(Math.random() * 2000) + 1000;

  constructor() { }

  create(project: Project): Observable<Project> {

    if (this.isError) {
      this.isError = !this.isError;

      return timer(this.randomDelay).pipe(
        concatMap(() =>
          throwError(() => ({
            status: 400,
            error: 'Bad Request',
            message: 'BAD_REQUEST',
          }))
        )
      );
    }

    return of(project).pipe(delay(this.randomDelay));
  }

  getAll(searchParams: SearchParams): Observable<Project[]> {
    const projectsList: Project[] = [
      {
        id: 'ID-1',
        name: 'Project Alpha 1',
        description: '8 in progress | 7 days left in progress days left in progress days left ogress days left ogress days left',
        code: 'PROJ0125',
        idOwner: '123',
      },
      {
        id: 'ID-2',
        name: 'Project Bravo 1',
        description: '15 completed | Completed today',
        code: 'success',
        idOwner: '1234',
      },
      {
        id: 'ID-3',
        name: 'Project Charlie 1',
        description: '12 in progress | 4 days left',
        code: 'PROJ0125',
        idOwner: '123',
      },
      {
        id: 'ID-4',
        name: 'Project DeltaSmart 1',
        description: '22 completed | Finished on Dec 12, 2023',
        code: 'success',
        idOwner: '123',
      },
      {
        id: 'ID-5',
        name: 'Project Alpha 2',
        description: '8 in progress | 7 days left',
        code: 'PROJ0125',
        idOwner: '123',
      },
      {
        id: 'ID-6',
        name: 'Project Bravo 2',
        description: '15 completed | Completed today',
        code: 'success',
        idOwner: '123',
      },
      {
        id: 'ID-7',
        name: 'Project Charlie 2',
        description: '12 in progress | 4 days left',
        code: 'PROJ0125',
        idOwner: '123',
      },
      {
        id: 'ID-8',
        name: 'Project DeltaSmart 2',
        description: '22 completed | Finished on Dec 12, 2023',
        code: 'success',
        idOwner: '123',
      },
    ]

    return of(projectsList).pipe(delay(this.randomDelay));
  }

  getById(id: string): Observable<Project> {
    const project: Project = {
      id: 'ID-sdsdlfjhsdkjfh',
      name: 'Project Alpha',
      description: '8 in progress | 7 days left in progress days left in progress days left ogress days left ogress days left',
      code: 'PROJ0125',
    }

    return of(project).pipe(delay(this.randomDelay));
  }

  update(project: Project): Observable<Project> {
    return of(project).pipe(delay(this.randomDelay));
  }

  delete(id: string): Observable<void> {
    return of(undefined).pipe(delay(this.randomDelay));
  }

}
