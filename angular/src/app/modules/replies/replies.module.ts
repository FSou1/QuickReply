import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReplyListComponent } from './components/reply-list/reply-list.component';
import { UiModule } from '../shared/ui.module';
import { CreateReplyComponent } from './components/create-reply/create-reply.component';
import { RepliesRoutingModule } from './replies-routing.module';
import { EditReplyComponent } from './components/edit-reply/edit-reply.component';

const COMPONENTS = [
  ReplyListComponent,
  CreateReplyComponent,
  EditReplyComponent
];

@NgModule({
  imports: [CommonModule, UiModule, RepliesRoutingModule],
  declarations: COMPONENTS,
  exports: [ReplyListComponent]
})
export class RepliesModule {}
