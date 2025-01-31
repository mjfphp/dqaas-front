import { Observable } from "rxjs";
import { Project } from "../types/project.type";
import { SearchParams } from "../../../../shared/search/domain/types/search-params.type";

export abstract class ProjectRepository {
	abstract create(project: Project): Observable<Project>;
	abstract getAll(searchParams: SearchParams): Observable<Project[]>;
	abstract getById(id: string): Observable<Project>;
	abstract update(project: Project): Observable<Project>;
	abstract delete(id: string): Observable<void>;
}