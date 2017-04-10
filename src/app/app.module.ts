import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { MessageRiverComponent } from './message-river/message-river.component';
import { CollaborationComponent } from './collaboration/collaboration.component';
import { OrderMessagesPipe } from './order-messages.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    MessageRiverComponent,
    CollaborationComponent,
    OrderMessagesPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [CollaborationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
