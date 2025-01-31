import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectRepository } from '../../domain/repositories/project.repository';
import { Project } from '../../domain/types/project.type';
import { SearchParams } from '../../../../shared/search/domain/types/search-params.type';

@Injectable({
  providedIn: 'root'
})
export class ProjectRepositoryImpl implements ProjectRepository {

  constructor(private readonly _http: HttpClient) { }

  create(project: Project): Observable<Project> {
    return this._http.post<Project>('/api/projects', project);
  }

  getAll(searchParams: SearchParams): Observable<Project[]> {
    return this._http.post<Project[]>('/api/projects', searchParams);
  }

  getById(id: string): Observable<Project> {
    return this._http.get<Project>(`/api/projects/${id}`);
  }

  update(project: Project): Observable<Project> {
    return this._http.put<Project>(`/api/projects/${project.id}`, project);
  }

  delete(id: string): Observable<void> {
    return this._http.delete<void>(`/api/projects/${id}`);
  }

}
