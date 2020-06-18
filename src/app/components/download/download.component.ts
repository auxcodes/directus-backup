import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/directus/client.service';
import { ProjectContentService } from '../../services/project-content.service';
import { FileManagerService } from '../../services/utils/file-manager.service';
import { Collection } from '../../shared/interfaces/collection';
import { LoginConfig } from '../../shared/interfaces/login-config';
import { DataType } from '../../shared/enums/data-type.enum';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  openFile = false;
  loggedIn = false;
  collections: Collection[] = [];
  allSelected = false;
  dlLoginConfig: LoginConfig = { url: '', project: '', email: '', server: DataType.Download };
  projectUrl = '';
  projectName = '';

  constructor(
    private clientService: ClientService,
    private contentService: ProjectContentService,
    private fileService: FileManagerService
  ) { }

  ngOnInit() {
    this.clientService.downloadReady.subscribe(ready => this.loggedIn = ready);
    this.contentService.backupConfig.subscribe(config => {
      this.dlLoginConfig = config.downloadLogin;
    });
    this.contentService.downloadedProject.subscribe(project => {
      if (project.collections) {
        this.collections = project.collections;
        this.contentService.selectedCollections.next(this.collections);
      }
      this.projectName = project.name;
      this.projectUrl = project.url;
      console.log('project: ', project);
    });
  }

  onLoggedIn(loginConfig: LoginConfig) {
    console.log('dl logged in: ', loginConfig);
    this.contentService.backupConfig.getValue().downloadLogin = loginConfig;
    this.contentService.saveConfig();
    this.projectName = loginConfig.project;
    this.projectUrl = loginConfig.url;
    this.contentService.downloadedProject.next({ name: loginConfig.project, url: loginConfig.url });
  }

  onGetCollections() {
    this.collections = [];
    this.contentService.collections()
      .then(result => {
        result.data.map(collection => {
          this.collections.push({ name: collection.collection, settings: collection, selected: false, items: null, error: '-' });
        });
        this.updateProjectContent();
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
    this.updateProjectContent();
  }

  onSelection(id) {
    const sid = this.collections.findIndex(coll => coll.name === id);
    this.collections[sid].selected = !this.collections[sid].selected;
    this.allSelected = this.allSelected ? false : this.allSelected;
    this.updateProjectContent();
  }


  onLogout() {
    this.collections = [];
    this.allSelected = false;
    this.contentService.selectedCollections.next(this.collections);
  }

  onFileSelected(event) {
    console.log('File selected: ', event);
    this.fileService.openFile(event.target.files[0]);
  }

  private updateProjectContent() {
    this.contentService.selectedCollections.next(this.collections);
    this.contentService.downloadedProject.next({ name: this.projectName, url: this.projectUrl, collections: this.collections });
  }
}
