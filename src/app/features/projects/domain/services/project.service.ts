import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Project } from "../types/project.type";
import { ProjectRepository } from "../repositories/project.repository";
import { SearchParams } from "../../../../shared/search/domain/types/search-params.type";

@Injectable({
	providedIn: 'root',
})
export class ProjectService {

	constructor(private _projectRepository: ProjectRepository) { }

	createProject(project: Project): Observable<Project> {
		return this._projectRepository.create(project);
	}

	getProjects(searchParams: SearchParams): Observable<Project[]> {
		return this._projectRepository.getAll(searchParams);
	}

	getProject(id: string): Observable<Project> {
		return this._projectRepository.getById(id);
	}

	updateProject(project: Project): Observable<Project> {
		return this._projectRepository.update(project);
	}

	deleteProject(id: string): Observable<void> {
		return this._projectRepository.delete(id);
	}

}