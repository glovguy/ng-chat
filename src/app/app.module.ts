import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ClientComponent } from './components/client/client.component';
import { MessageRiverComponent } from './components/message-river/message-river.component';
import { CollaborationComponent } from './components/collaboration/collaboration.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    MessageRiverComponent,
    CollaborationComponent,
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
