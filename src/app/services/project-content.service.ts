import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../shared/interfaces/project';
import { CollectionsService } from './directus/collections.service';
import { ClientService } from './directus/client.service';
import { DataType } from '../shared/enums/data-type.enum';
import { Collection } from '@directus/sdk-js';

@Injectable({
  providedIn: 'root'
})
export class ProjectContentService {

  downloadProject: BehaviorSubject<Project> = new BehaviorSubject<Project>({ dataType: DataType.Download });

  constructor(
    private clientService: ClientService,
    private collectionService: CollectionsService
  ) { }

  async collections(): Promise<Collection[]> {
    let collections = [];
    await this.collectionService.getCollections()
      .then(results => {
        collections = results;
      })
      .catch(error => {
        console.error('Error getting collections: ', error);
        collections = error;
      });
    return collections;
  }

}
