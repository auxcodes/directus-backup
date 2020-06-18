import { Injectable } from '@angular/core';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
  constructor(private clientService: ClientService) { }

  async getCollections() {
    try {
      return this.clientService.client().getCollections();
    }
    catch (error) {
      console.log('Error getting collection: ', error);
      return [{ error: error }];
    }
  }

  async getCollection(name: string) {
    try {
      return this.clientService.client().getCollection(name);
    }
    catch (error) {
      console.log('Error getting collection: ', error);
      return error;
    }
  }

  async createCollection(data: object) {
    try {
      return this.clientService.client().createCollection(data);
    }
    catch (error) {
      console.log('Error creating collection: ', error);
      return error;
    }
  }

  async updateCollection(collection: string, data: object) {
    try {
      return this.clientService.client().updateCollection(collection, data);
    }
    catch (error) {
      console.log('Error updating collection: ', error);
      return error;
    }
  }
}
