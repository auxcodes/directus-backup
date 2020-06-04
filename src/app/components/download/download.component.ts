import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/directus/client.service';
import { ProjectContentService } from '../../services/project-content.service';
import { Collection } from '../../shared/interfaces/collection';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  loggedIn = false;
  collections: Collection[] = [];
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
        result.data.map(collection => {
          this.collections.push({ name: collection.collection, fields: collection.fields, items: []})
        });

      })
      .catch(error => console.error('Error getting collections: ', error));
  }

  onGetItems() {
    this.items = [];
    for (const collection of this.collections) {
      this.contentService.items(collection.name)
        .then(result => {
          if (result.data) {
            const index = this.collections.findIndex(coll => collection.name === coll.name);
            this.collections[index].items = result.data;
            console.log('items: ', { name: collection.name, items: result.data });
          }
          else {
            this.items.push({ name: collection.name, items: [] });
          }
        })
        .catch(error => console.error('Error getting items: ', error));
    }
  }

  onSelectAll() {
    this.allCollections = !this.allCollections;
  }

}
