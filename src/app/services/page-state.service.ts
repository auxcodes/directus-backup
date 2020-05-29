import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageStateService {

  currentTab: BehaviorSubject<string> = new BehaviorSubject<string>('download');

  constructor() { }
}
