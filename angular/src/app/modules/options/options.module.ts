import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { OptionsRoutingModule } from './options-routing.module'
import { OptionsComponent } from './pages/options/options.component'
import { UiModule } from '../shared/ui.module'

@NgModule({
  declarations: [OptionsComponent],
  imports: [
    CommonModule,
    UiModule,
    OptionsRoutingModule
  ]
})
export class OptionsModule {}
