import { Injectable } from '@angular/core';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private clientService: ClientService) { }

    async getItems(collection: string, params?: object) {
        try {
            return this.clientService.client().getItems(collection, params);
        }
        catch (e) {
            console.log('Error getting items: ', e);
            return;
        }
    }

    async getItem(collection: string, primaryKey: number, params?: object) {
        try {
            return this.clientService.client().getItem(collection, primaryKey, params);
        }
        catch (e) {
            console.log('Error getting item: ', e);
            return;
        }
    }

  async updateItem(collection: string, primaryKey: number, body: object) {
    console.log(collection, primaryKey, body);
        try {
            return this.clientService.client().updateItem(collection, primaryKey, body);
        }
        catch (error) {
            console.log('Error updating item: ', error);
            return;
        }
    }

    async createItem(collection: string, body: object) {
        try {
            return this.clientService.client().createItem(collection, body);
        }
        catch (error) {
            console.log('Error creating item: ', error);
            return;
        }
    }
}
