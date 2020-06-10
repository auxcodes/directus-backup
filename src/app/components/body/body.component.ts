import { Component, OnInit } from '@angular/core';
import { PageStateService } from '../../services/page-state.service';
import { BackupConfig } from '../../shared/interfaces/backup-config';
import { ProjectContentService } from '../../services/project-content.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  constructor(
    private tabState: PageStateService,
    private contentService: ProjectContentService
  ) { }

  selected = {};

  ngOnInit() {
    this.tabState.currentTab.subscribe(activeTab => {
      this.selected = activeTab;
    });
    this.checkStorage();
  }

  checkStorage() {
    if (localStorage.getItem('directus-backup')) {
      this.contentService.backupConfig.next(JSON.parse(localStorage.getItem('directus-backup')));
    }
    else {
      this.contentService.backupConfig.next({
        downloadLogin: { url: '', project: '', email: '' },
        uploadLogin: { url: '', project: '', email: ''}
      });
    }
  }
}
