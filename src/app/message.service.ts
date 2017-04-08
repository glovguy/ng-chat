import { Injectable } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class MessageService {

  constructor(private http: Http) { }

  getMessages(successCallback, failureCallback): void {
      this.http.get(`/chat/messages`)
      .map(resp => resp.json())
      .subscribe(
          (data) => successCallback(data),
          (error) => failureCallback(error)
          );
  }

  newMessage(message:any, successCallback, failureCallback) {
    this.http.post(`/chat/messages`, message)
    .map(resp => resp.json())
    .subscribe(
        (data) => successCallback(data),
        (error) => failureCallback(error)
        );
  }

}
