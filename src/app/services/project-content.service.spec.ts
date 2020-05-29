import { TestBed } from '@angular/core/testing';

import { ProjectContentService } from './project-content.service';

describe('ProjectContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectContentService = TestBed.get(ProjectContentService);
    expect(service).toBeTruthy();
  });
});
