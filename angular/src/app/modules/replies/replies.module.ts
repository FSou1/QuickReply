import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReplyListComponent } from './components/reply-list/reply-list.component';
import { UiModule } from '../shared/ui.module';
import { CreateReplyComponent } from './components/create-reply/create-reply.component';
import { RepliesRoutingModule } from './replies-routing.module';
import { EditReplyComponent } from './components/edit-reply/edit-reply.component';
import { ListViewComponent } from './components/reply-list/list-view/list-view.component';
import { TileViewComponent } from './components/reply-list/tile-view/tile-view.component';

const COMPONENTS = [
  ReplyListComponent,
  CreateReplyComponent,
  EditReplyComponent,
  ListViewComponent,
  TileViewComponent
];

@NgModule({
  imports: [CommonModule, UiModule, RepliesRoutingModule],
  declarations: COMPONENTS,
  exports: [ReplyListComponent]
})
export class RepliesModule {}
