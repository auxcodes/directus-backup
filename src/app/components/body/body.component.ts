import { Component, OnInit } from '@angular/core';
import { PageStateService } from '../../services/page-state.service';
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
    this.contentService.loadConfig();
  }
}
