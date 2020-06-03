import { Component, OnInit } from '@angular/core';
import { Collection, Item } from '@directus/sdk-js';
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
  items = [];
  allCollections = false;

  constructor(
    private clientService: ClientService,
    private contentService: ProjectContentService) { }

  ngOnInit() {
    this.clientService.downloadReady.subscribe(ready => this.loggedIn = ready);
  }

  onGetCollections() {
    this.collections = [];
    this.contentService.collections()
      .then(result => {
        this.collections = result.data;
        console.log('collections: ', this.collections);
      })
      .catch(error => console.error('Error getting collections: ', error));
  }

  onGetItems() {
    this.items = [];
    for (const collection of this.collections) {
      this.contentService.items(collection.collection)
        .then(result => {
          if (result.data) {
            this.items.push({ name: collection.collection, items: result.data });
            console.log('items: ', { name: collection.collection, items: result.data });
          }
          else {
            this.items.push({ name: collection.collection, items: [] });
          }
        })
        .catch(error => console.error('Error getting items: ', error));
    }
  }

  onSelectAll() {
    this.allCollections = !this.allCollections;
  }

}
