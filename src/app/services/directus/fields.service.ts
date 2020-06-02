import { Injectable } from '@angular/core';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  constructor(private clientService: ClientService) { }

  async getFields(collection: string) {
      try {
          return this.clientService.client().getFields(collection);
      }
      catch (e) {
          console.log('Error getting fields: ', e);
          return;
      }
  }

  async getField(collection: string, fieldName: string, options: object) {
      try {
          return this.clientService.client().getField(collection, fieldName, options);
      }
      catch (e) {
          console.log('Error getting field: ', e);
          return;
      }
  }
}
