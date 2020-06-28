import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Reply } from '../../models';
import { Location } from '@angular/common';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { ReplyService } from '../../services/reply.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { ExchangeService } from 'src/app/modules/shared/services/exchange.service';
import { APP_CONFIG, IAppConfig } from 'src/app/app.config';

@Component({
  selector: 'app-edit-reply',
  templateUrl: './edit-reply.component.html',
  styleUrls: ['./edit-reply.component.scss']
})
export class EditReplyComponent implements OnInit {
  id: string;
  form: FormGroup;

  @ViewChild('displayName', { static: true }) displayName: ElementRef;

  templates: string[] = this.config.supportedParameters;

  constructor (
    private route: ActivatedRoute,
    private _service: ReplyService,
    private _location: Location,
    private notification: NotificationService,
    private exchange: ExchangeService,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) {}

  ngOnInit (): void {
    this.displayName.nativeElement.focus();
    this.form = new FormGroup({
      displayName: new FormControl('', [Validators.maxLength(25)]),
      content: new FormControl('', [Validators.required])
    });

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this._service.get(params.get('id'))),
        take(1)
      )
      .subscribe((reply) => {
        this.id = reply.id;
        this.form.patchValue(reply);
      });
  }

  submit (): void {
    if (this.form.invalid) {
      return;
    }

    const reply: Reply = {
      id: this.id,
      ...this.form.value
    };

    this._service.update(reply).then((item) => {
      this.notification.show(`«${item.displayName}» reply has been updated`);
      this.exchange.sendMessage('update_context_menu');
      this._location.back();
    }, () => {
      this.notification.show('Error: reply has not been updated');
    });
  }
}
