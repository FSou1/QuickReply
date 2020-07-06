import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OptionsComponent } from './pages/options/options.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'replies',
    pathMatch: 'full'
  },
  {
    path: 'replies',
    component: OptionsComponent,
    loadChildren: () => import('../replies/replies.module').then(m => m.RepliesModule)
  },
  {
    path: 'changelog',
    component: OptionsComponent,
    loadChildren: () => import('../changelog/changelog.module').then(m => m.ChangelogModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptionsRoutingModule {}
