import { NgModule } from '@angular/core'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { MaterialModule } from './material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NotificationService } from './services/notification.service'
import { ExchangeService } from './services/exchange.service'

@NgModule({
  imports: [
    MaterialModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    NotificationService,
    ExchangeService
  ]
})
export class UiModule {}
