import { NgModule } from '@angular/core';
import { ChangelogListComponent } from './components/changelog-list/changelog-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ChangelogListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangelogRoutingModule {}