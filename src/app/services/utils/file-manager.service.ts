import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { ProjectContentService } from '../../services/project-content.service';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  constructor(private contentService: ProjectContentService) { }

  saveToFile() {
    const project = JSON.stringify(this.contentService.downloadedProject.value);
    const filename = this.contentService.downloadedProject.value.name + '-' + this.fileDate();
    const blob = new Blob([project], { type: 'text/plain' });
    saveAs(blob, filename);
  }

  fileDate(): string{
    const dateString = (Date.prototype.getFullYear() + Date.prototype.getMonth() + Date.prototype.getDate() + 
                        Date.prototype.getHours() + ':' + Date.prototype.getMinutes() + ':' + Date.prototype.getSeconds()).toString() ;
    return dateString;
  }
}
