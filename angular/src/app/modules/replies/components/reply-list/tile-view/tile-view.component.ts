import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as Sortable from 'sortablejs';
import { Reply } from '../../../models';

@Component({
  selector: 'app-tile-view',
  templateUrl: './tile-view.component.html',
  styleUrls: ['./tile-view.component.scss']
})
export class TileViewComponent {
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
