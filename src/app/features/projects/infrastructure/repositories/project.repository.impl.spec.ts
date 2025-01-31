import { TestBed } from '@angular/core/testing';
import { ProjectRepositoryImpl } from './project.repository.impl';

describe('ProjectRepositoryImpl', () => {
  let service: ProjectRepositoryImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectRepositoryImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
