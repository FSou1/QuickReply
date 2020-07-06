import { Component, OnInit } from '@angular/core';
import { ReplyService } from '../../services/reply.service';
import { Reply } from '../../models';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { ExchangeService } from 'src/app/modules/shared/services/exchange.service';
import * as Sortable from 'sortablejs';

@Component({
  selector: 'app-reply-list',
  templateUrl: './reply-list.component.html',
  styleUrls: ['./reply-list.component.scss']
})
export class ReplyListComponent implements OnInit {
  data: Reply[];
  options: Sortable.Options;
  
  constructor (
    private service: ReplyService,
    private notification: NotificationService,
    private exchange: ExchangeService
  ) {
    this.options = {
      handle: '.handle',
      onUpdate: () => this.service.set(this.data)
    };
  }

  ngOnInit (): void {
    this.service.getAll().then(data => {
      this.data = data;
    });
  }

  update(replies: Reply[]): void {
    this.service.set(replies);
  }

  delete (reply: Reply): void {
    this.service.remove(reply).then((item) => {
      this.data = this.data.filter(i => i.id !== item.id);
      this.exchange.sendMessage('update_context_menu');
      this.notification.show('Reply has been deleted');
    }, () => {
      this.notification.show('Error: reply has not been deleted');
    });
  }
}
