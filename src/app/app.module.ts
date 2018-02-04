import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ChatTextInputComponent } from './components/chat-text-input/chat-text-input.component';
import { MessageRiverComponent } from './components/message-river/message-river.component';
import { CollaborationComponent } from './components/collaboration/collaboration.component';
import { MessageComponent } from './components/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatTextInputComponent,
    MessageRiverComponent,
    CollaborationComponent,
    MessageComponent,
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
