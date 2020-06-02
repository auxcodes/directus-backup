import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/directus/client.service';
import { ProjectContentService } from '../../services/project-content.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  loggedIn = false;
  collections = [];

  constructor(
    private clientService: ClientService,
    private contentService: ProjectContentService) { }

  ngOnInit() {
    this.clientService.downloadReady.subscribe(ready => this.loggedIn = ready);
  }

  onGetCollections() {
    this.contentService.collections().then(result => {
      this.collections = result.data;
      console.log(this.collections);
    });
  }

}
