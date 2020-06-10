import { Component, OnInit } from '@angular/core';
import { Collection } from '../../shared/interfaces/collection';
import { ClientService } from '../../services/directus/client.service';
import { ProjectContentService } from '../../services/project-content.service';
import { LoginConfig } from '../../shared/interfaces/login-config';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  loggedIn = false;
  collections: Collection[] = [];
  ulLoginConfig: LoginConfig = { url: '', project: '', email: '' };

  constructor(
    private clientService: ClientService,
    private contentService: ProjectContentService) { }

  ngOnInit() {
    this.clientService.uploadReady.subscribe(ready => this.loggedIn = ready);
    this.contentService.selectedCollections.subscribe(selectedCollections => this.collections = selectedCollections);
    this.contentService.backupConfig.subscribe(config => {
      this.ulLoginConfig = config.uploadLogin;
    });
  }

  onLoggedIn(loginConfig: LoginConfig) {
    this.contentService.backupConfig.getValue().uploadLogin = loginConfig;
    this.contentService.saveConfig();
  }

}
