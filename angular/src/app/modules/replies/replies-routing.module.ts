import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { CreateReplyComponent } from './components/create-reply/create-reply.component';
import { ReplyListComponent } from './components/reply-list/reply-list.component';
import { EditReplyComponent } from './components/edit-reply/edit-reply.component';

const routes: Routes = [
  {
    path: '',
    component: ReplyListComponent,
  },
  {
    path: 'create',
    component: CreateReplyComponent
  },
  {
    path: 'edit/:id',
    component: EditReplyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepliesRoutingModule {}
