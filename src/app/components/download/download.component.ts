import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/directus/client.service';
import { ProjectContentService } from '../../services/project-content.service';
import { Collection } from '../../shared/interfaces/collection';
import { LoginConfig } from '../../shared/interfaces/login-config';
import { environment } from '../../../environments/environment';
import { BackupConfig } from '../../shared/interfaces/backup-config';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  loggedIn = false;
  collections: Collection[] = [];
  allSelected = false;
  dlLoginConfig: LoginConfig = { url: '', project: '', email: ''};

  constructor(
    private clientService: ClientService,
    private contentService: ProjectContentService) { }

  ngOnInit() {
    this.clientService.downloadReady.subscribe(ready => this.loggedIn = ready);
    this.contentService.backupConfig.subscribe(config => {
      this.dlLoginConfig = config.downloadLogin;
      console.log('DL Login Config: ', this.dlLoginConfig);
    });
  }

  onLoggedIn(loginConfig: LoginConfig) {
    console.log('Download login details: ', loginConfig);
    this.contentService.backupConfig.getValue().downloadLogin = loginConfig;
    this.contentService.saveConfig();
  }

  onGetCollections() {
    this.collections = [];
    this.contentService.collections()
      .then(result => {
        result.data.map(collection => {
          this.collections.push({ name: collection.collection, fields: collection.fields, selected: false, items: null, error: '-' });
        });

      })
      .catch(error => console.error('Error getting collections: ', error));
  }

  onGetItems() {
    for (const collection of this.collections) {
      collection.items = null;
      collection.error = '-';
      if (collection.selected) {
        this.contentService.items(collection.name)
          .then(result => {
            const index = this.collections.findIndex(coll => collection.name === coll.name);
            if (result.data) {      
              this.collections[index].items = result.data;
              console.log('items: ', { name: collection.name, items: result.data });
            }
            else {
              this.collections[index].error = 'Not Found';
            }
          })
          .catch(error => console.error('Error getting items: ', error));
      }
    }
  }

  onSelectAll(checked) {
    this.allSelected = checked;
    this.collections.forEach(sid => sid.selected = checked);
    this.contentService.selectedCollections.next(this.collections);
  }

  onSelection(id) {
    const sid = this.collections.findIndex(coll => coll.name === id);
    this.collections[sid].selected = !this.collections[sid].selected;
    this.allSelected = this.allSelected ? false : this.allSelected;
    this.contentService.selectedCollections.next(this.collections);
  }

}
