/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Http } from '@angular/http';

import { MessageRiverComponent } from './message-river.component';
import { MessageService } from '../../services/message.service';

describe('MessageRiverComponent', () => {
  let component: MessageRiverComponent;
  let fixture: ComponentFixture<MessageRiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageRiverComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageRiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('The message river receives message history from the server', () => {
    const messagesJson = [
        {
            "id": 1,
            "body": "first message that is very long because I need to test how the styles interact, because what if I have to change the css? I suspect this will be long enough, but who can really tell anymore?",
            "sender": 1,
            "style": "bot"
        },
        {
            "id": 4,
            "body": "fourth",
            "sender": 2,
            "style": "bot"
        },
        {
            "id": 3,
            "body": "third message from sender 2...",
            "sender": 2,
            "style": "user"
        },
        {
            "id": 422,
            "body": "no, thats not a sandwich",
            "sender": 1,
            "style": "bot"
        },
        {
            "id": 2,
            "body": "second message!",
            "sender": 1,
            "style": "bot"
        }
    ];
    const sortedMessagesJson = [
        {
            "id": 422,
            "body": "no, thats not a sandwich",
            "sender": 1,
            "style": "bot"
        },
        {
            "id": 4,
            "body": "fourth",
            "sender": 2,
            "style": "bot"
        },
        {
            "id": 3,
            "body": "third message from sender 2...",
            "sender": 2,
            "style": "user"
        },
        {
            "id": 2,
            "body": "second message!",
            "sender": 1,
            "style": "bot"
        },
        {
            "id": 1,
            "body": "first message that is very long because I need to test how the styles interact, because what if I have to change the css? I suspect this will be long enough, but who can really tell anymore?",
            "sender": 1,
            "style": "bot"
        }
    ];

    it('orders the incoming messages', () => {
      const msgOut = component.sortMessagesById(messagesJson);
      expect(msgOut).toEqual(sortedMessagesJson);
    });
  });

});
