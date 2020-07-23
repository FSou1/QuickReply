import { Component } from '@angular/core';
import { TutorialService } from 'src/app/modules/info/services/tutorial.service';

@Component({
  selector: 'app-options',
  templateUrl: 'options.component.html',
  styleUrls: ['options.component.scss']
})
export class OptionsComponent {
  constructor(private tutorialService: TutorialService) { }

  githubUrl = 'https://github.com/FSou1/QuickReply';
  chromeWebStoreUrl = 'https://chrome.google.com/webstore/detail/quickreply/enngmhjfhandgjeccahinpmjfmllklki';
  
  startTutorial(): void {
    this.tutorialService.startTutorial();
  }
}
