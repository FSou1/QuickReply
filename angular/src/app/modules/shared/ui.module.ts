import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from './services/notification.service';
import { ExchangeService } from './services/exchange.service';
import { SortablejsModule } from 'ngx-sortablejs';

@NgModule({
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SortablejsModule,
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SortablejsModule
  ],
  providers: [
    NotificationService,
    ExchangeService
  ]
})
export class UiModule {}
