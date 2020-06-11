import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { ProjectContentService } from '../../services/project-content.service';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  constructor(private contentService: ProjectContentService) { }

  saveToFile() {
    const project = JSON.stringify(this.contentService.downloadedProject.value);
    const filename = this.contentService.downloadedProject.value.name + Date();
    const blob = new Blob([project], { type: 'text/plain' });
    saveAs(blob, filename);
  }
}
