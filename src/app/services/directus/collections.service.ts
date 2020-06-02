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
        return [{ error: error}];
      }
  }

  async getCollection(name: string) {
      let collection: any;
      try {
          return collection = this.clientService.client().getCollection(name);
      }
      catch (error) {
          console.log('Error getting collection: ', error);
          return error;
      }
  }
}
