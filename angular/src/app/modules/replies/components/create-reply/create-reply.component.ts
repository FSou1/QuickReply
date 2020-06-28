import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReplyService } from '../../services/reply.service';
import { Reply } from '../../models';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { ExchangeService } from 'src/app/modules/shared/services/exchange.service';
import { APP_CONFIG, IAppConfig } from 'src/app/app.config';

@Component({
  selector: 'app-create-reply',
  templateUrl: './create-reply.component.html',
  styleUrls: ['./create-reply.component.scss'],
})
export class CreateReplyComponent implements OnInit {
  form: FormGroup;

  @ViewChild('displayName', { static: true }) displayName: ElementRef;

  templates: string[] = this.config.supportedParameters;

  constructor(
    private _service: ReplyService,
    private _location: Location,
    private notification: NotificationService,
    private exchange: ExchangeService,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) {}

  ngOnInit(): void {
    this.displayName.nativeElement.focus();
    this.form = new FormGroup({
      displayName: new FormControl(null, [Validators.maxLength(25)]),
      content: new FormControl(null, [Validators.required]),
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const reply: Reply = {
      ...this.form.value,
    };

    this._service.add(reply).then(
      (item) => {
        this.notification.show(`«${item.displayName}» reply has been added`);
        this.exchange.sendMessage('update_context_menu');
        this._location.back();
      },
      () => {
        this.notification.show('Error: reply has not been added');
      }
    );
  }

  cancel(): void {
    this._location.back();
  }
}
