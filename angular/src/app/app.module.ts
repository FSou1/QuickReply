import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_CONFIG, APP_DI_CONFIG } from './app.config';
import { SortablejsModule } from 'ngx-sortablejs';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SortablejsModule.forRoot({
      animation: 300,
    })
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: APP_CONFIG, useValue: APP_DI_CONFIG }]
})
export class AppModule {}
