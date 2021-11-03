import { MensajesService } from './../../services/mensajes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  private mensajes: string[];

  constructor(private mensajesService: MensajesService) { }

  ngOnInit() {
    this.mensajes = this.mensajesService.getMensajes();
  }

}
