import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Socket;
  readonly url: string =  "https://employee-webserver.herokuapp.com/";

  constructor() {
    this.socket = io(this.url, {
      forceNew: false,
      transports: ['websocket'],
      upgrade: false
    })
  }

  listen(eventName: string){
    return new Observable((sub) => {
      this.socket.on(eventName, (data: any) => {
        sub.next(data)
      })
    })
  }

  emit(eventName: string, data: any){
    this.socket.emit(eventName, data)
  }
}
