/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import { Component, OnInit } from '@angular/core'
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop'
import { ReplyService } from '../../services/reply.service'
import { Reply } from '../../models'
import { NotificationService } from 'src/app/modules/shared/services/notification.service'
import { ExchangeService } from 'src/app/modules/shared/services/exchange.service'

@Component({
  selector: 'app-reply-list',
  templateUrl: './reply-list.component.html',
  styleUrls: ['./reply-list.component.scss']
})
export class ReplyListComponent implements OnInit {
  data: Reply[];

  constructor (
    private service: ReplyService,
    private notification: NotificationService,
    private exchange: ExchangeService
  ) { }

  ngOnInit (): void {
    this.service.getAll().then(data => {
      this.data = data
    })
  }

  drop (event: CdkDragDrop<string[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex)
    this.service.set(this.data).then(() => {
      this.notification.show('Reply was reordered')
    })
  }

  delete (reply: Reply) {
    this.service.remove(reply).then((item) => {
      this.data = this.data.filter(i => i.id !== item.id)
      this.exchange.sendMessage('update_context_menu')
      this.notification.show('Reply has been deleted')
    }, () => {
      this.notification.show('Error: reply has not been deleted')
    })
  }
}
