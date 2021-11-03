import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private mensajes: string[] = [];

  constructor() { }

  addMensaje(mensaje: string) {
    console.log(mensaje);
    this.mensajes.push(mensaje);
  }

  getMensajes(): string[] {
    return this.mensajes;
  }
}
