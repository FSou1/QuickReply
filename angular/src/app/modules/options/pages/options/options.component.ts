import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/modules/info/services/tutorial.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-options',
  templateUrl: 'options.component.html',
  styleUrls: ['options.component.scss'],
})
export class OptionsComponent implements OnInit {
  githubUrl = environment.community.githubUrl;
  chromeWebStoreUrl = environment.community.chromeStoreUrl;

  constructor(
    private route: ActivatedRoute,
    private tutorialService: TutorialService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      if (params['walkthrough']) {
        this.startTutorial();
      }
    });
  }

  startTutorial(): void {
    this.tutorialService.startTutorial();
  }
}
