import { NgModule } from '@angular/core';
import { ChangelogListComponent } from './components/changelog-list/changelog-list.component';
import { CommonModule } from '@angular/common';
import { ChangelogRoutingModule } from './changelog-routing.module';
import { UiModule } from '../shared/ui.module';

const COMPONENTS = [
  ChangelogListComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [CommonModule, ChangelogRoutingModule, UiModule],
  exports: [ChangelogListComponent]
})
export class ChangelogModule {}