import { Component, OnInit } from '@angular/core';
import { PageStateService } from '../../services/page-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  selected = 'download';

  constructor(private stateService: PageStateService) { }

  ngOnInit() {
    this.stateService.currentTab.subscribe(activeTab => {
      this.selected = activeTab;
    });
  }

  onSelected(selection: string) {
    this.stateService.currentTab.next(selection);
  }

}
