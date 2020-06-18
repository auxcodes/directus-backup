import { Injectable } from '@angular/core';
import { CollectionsService } from './directus/collections.service';
import { Project } from '../shared/interfaces/project';
import { Collection } from '../shared/interfaces/collection';
import { ItemsService } from './directus/items.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private collectionService: CollectionsService,
    private itemService: ItemsService) { }

  async upload(project: Project) {
    await this.uploadCollections(project.collections)
      .catch(error => console.error('Upload error: ', error));
  }

  private async uploadCollections(collections: Collection[]) {
    await collections.forEach(collection => {
      if (collection.selected) {
        this.addCollection(collection);
      }
    });
  }

  private async addCollection(collection: Collection) {
    console.log('Attempting to create collection: ', collection.name);
    this.collectionService.createCollection(collection.settings)
      .then(result => {
        console.log('Collection created: ', collection.name, result);
        this.uploadItems(collection.name, collection.items);
      })
      .catch(error => {
        if (error.code === 4 || error.code === 307) {
          console.log('Collection already exists: ', collection.name);
          console.log('Attempting to update collection: ', collection.name);
          this.collectionService.updateCollection(collection.name, collection.settings)
            .then(result => {
              console.log('Collection updated: ', collection.name, result);
              this.uploadItems(collection.name, collection.items);
            })
            .catch(error => console.error('Error updating collection: ', collection.name, error));
        }
        else {
          console.error('Error creating collection: ', collection.name, error);
        }
      });

  }

  private async uploadItems(collection: string, items) {
    await items.forEach(item => {
      if (item) {
        this.addItem(collection, item);
      }
      else {
        console.error('Error uploading item: ', item);
      }
    });
  }

  private addItem(collection: string, item) {
    this.itemService.createItem(collection, item)
      .then(result => console.log('item created for collection: ', collection, result))
      .catch(error => {
        if (error.code === 204) {
          const id = item.id;
          delete item.id;
          this.itemService.updateItem(collection, id, item)
            .then(result => console.log('item updated for collection: ', collection, result))
            .catch(error => console.error('Error updating item for collection: ', collection, error));
        }
        else {
          console.error('Error creating item for collection: ', collection, error);
        }
      });
  }
}
