/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { MessageService } from './message.service';


fdescribe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        MessageService,
        {
          imports: Http,
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions
      ]
    });
  });

  beforeEach(() => {
    this.sampleMessages = JSON.stringify([
              {
                  id: 1,
                  body: "first message that is very long because I need to test how the styles interact, because what if I have to change the css? I suspect this will be long enough, but who can really tell anymore?",
                  sender: 1,
                  style: "bot"
              },
              {
                  id: 2,
                  body: "second message!",
                  sender: 1,
                  style: "user"
              },
              {
                  id: 3,
                  body: "third message from sender 2...",
                  sender: 2,
                  style: "user"
              }
          ]);
  })


  beforeEach(inject([MessageService, MockBackend], (service, mockBackend) => {
    this.connection = MockConnection;
    this.service = service;
    this.mockBackend = mockBackend;
  }));

  beforeEach(() => {
    const successCallback = jasmine.createSpy('successCallback');
    const failureCallback = jasmine.createSpy('failureCallback');
    this.successCallback = successCallback;
    this.failureCallback = failureCallback;
  });

  afterEach(() => {
    this.mockBackend.verifyNoPendingRequests();
  });

  it('should fetch messages JSON from /chat/messages', inject([MessageService], (service: MessageService) => {
    const mockResp = new Response(new ResponseOptions({ status: 200, body: this.sampleMessages }));
    this.mockBackend.connections.subscribe((connection) => {
      expect(connection.request.url).toEqual('/chat/messages');
      connection.mockRespond(mockResp);
    });

    this.service.getMessages(this.successCallback, this.failureCallback);

    expect(this.successCallback).toHaveBeenCalledWith(JSON.parse(this.sampleMessages));
    expect(this.failureCallback).not.toHaveBeenCalled();
  }));

  it('should call the failureCallback when API call fails', inject([MessageService], (service: MessageService) => {
    const mockResp = new Response(new ResponseOptions({status: 404, body: 'error'}));
    this.mockBackend.connections.subscribe((connection) => {
      expect(connection.request.url).toEqual('/chat/messages');
      connection.mockRespond(mockResp);
    });

    this.service.getMessages(this.successCallback, this.failureCallback);

    expect(this.failureCallback).toHaveBeenCalled();
  }));
});
