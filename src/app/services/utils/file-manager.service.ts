import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { ProjectContentService } from '../../services/project-content.service';
import { DatePipe } from '@angular/common';
import { Project } from '../../shared/interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  constructor(private contentService: ProjectContentService) { }

  openFile(file) {
    let project;
    const reader = new FileReader();
    reader.onload = progressEvent => {
      project = reader.result;
      this.contentService.downloadedProject.next(JSON.parse(project));
    }
    reader.readAsText(file);
  }

  saveToFile() {
    const project = this.collectionFilter(this.contentService.downloadedProject.value);
    const filename = this.contentService.downloadedProject.value.name.toUpperCase() + '_' + 'DirectusBackup' + '_' + this.fileDate() + '.json';
    const blob = new Blob([JSON.stringify(project)], { type: 'text/plain' });
    saveAs(blob, filename);
  }

  private fileDate(): string{
    const pipe = new DatePipe('en-US');
    const date = Date.now();
    const dateString = pipe.transform(date, 'yyyy-MM-dd_hhmmss');
    return dateString;
  }

  private collectionFilter(project: Project): Project {
    const result = project;
    result.collections = project.collections.filter(collection => collection.selected)
    return result;
  }
}
