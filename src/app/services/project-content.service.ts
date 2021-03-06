import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../shared/interfaces/project';
import { CollectionsService } from './directus/collections.service';
import { ClientService } from './directus/client.service';
import { DataType } from '../shared/enums/data-type.enum';
import { ItemsService } from './directus/items.service';
import { Collection } from '../shared/interfaces/collection';
import { BackupConfig } from '../shared/interfaces/backup-config';

@Injectable({
  providedIn: 'root'
})
export class ProjectContentService {

  backupConfig: BehaviorSubject<BackupConfig> = new BehaviorSubject<BackupConfig>({});
  downloadedProject: BehaviorSubject<Project> = new BehaviorSubject<Project>({ });
  selectedCollections: BehaviorSubject<Collection[]> = new BehaviorSubject<Collection[]>([]);

  constructor(
    private clientService: ClientService,
    private collectionService: CollectionsService,
    private itemService: ItemsService
  ) { }

  async projectInfo() {
    // get project information
  }

  async collections(): Promise<any> {
    let collections;
    await this.collectionService.getCollections()
      .then(results => {
        collections = results;
        console.log(results);
      })
      .catch(error => {
        console.error('Content Service - Error getting collections: ', error);
        collections = error;
      });
    return collections;
  }

  async items(collection: string): Promise<any> {
    let items;
    await this.itemService.getItems(collection)
      .then(results => {
        items = results;
      })
      .catch(error => {
        console.error('Content Service - Error getting items for: ', collection, ' Error: ', error);
        items = error;
      });
    return items;
  }

  saveConfig() {
    localStorage.setItem('directus-backup', JSON.stringify(this.backupConfig.value));
    this.loadConfig();
  }

  loadConfig() {
    if (localStorage.getItem('directus-backup')) {
      this.backupConfig.next(JSON.parse(localStorage.getItem('directus-backup')));
    }
    else {
      this.backupConfig.next({
        downloadLogin: { url: '', project: '', email: '', server: DataType.Download },
        uploadLogin: { url: '', project: '', email: '', server: DataType.Upload }
      });
    }
  }

}
