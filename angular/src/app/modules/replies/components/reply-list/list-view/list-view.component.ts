import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Reply } from '../../../models';
import * as Sortable from 'sortablejs';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent {
  @Input() items: Reply[];
  @Output() onUpdate = new EventEmitter<Reply[]>();
  @Output() onDelete = new EventEmitter<Reply>();

  options: Sortable.Options;
  
  constructor() {
    this.options = {
      handle: '.handle',
      onUpdate: () => this.onUpdate.emit(this.items)
    };
  }

  delete(item: Reply): void {
    this.onDelete.emit(item);
  }
}
