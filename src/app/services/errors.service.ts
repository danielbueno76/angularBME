import { MensajesService } from './mensajes.service';
import { Observable, throwError } from 'rxjs';
import { Empleado } from '../model/empleado';
import { EmpleadosErrorType, EmpleadoNoEncontradoError, EmpleadoYaExisteError, EmpleadosError } from '../model/errors';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

/*
 * Clase que gestiona el lanzamiento y procesamiento de los diferentes errores
 * que se pueden producir en la app
 * Actualmente tenemos las siguientes funcionalidades:
 * 
 *   - throwError: para devolver un Observable que automáticamente genera un
 *      error de tipo EmpleadosError (NoEncontrado, YaExiste, etc)
 * 
 *   - handleError: para reaccionar a la generación de un error de los anteriores
 *      (por ejemplo, añadiendo un mensaje a MensajesService)
 * 
 *   - parseError: parsea el código de estado http y devuelve el tipo de error
 *      asociado
 */ 
@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor(private mensajesService: MensajesService) { }

  throwError(errorType: EmpleadosErrorType, empleado?: Empleado): Observable<never> {
    switch (errorType) {

      case EmpleadosErrorType.NOT_FOUND:
        return throwError(new EmpleadoNoEncontradoError(`Error: el empleado con cif ${empleado.cif}
          no existe`, empleado));
          
      case EmpleadosErrorType.DUPLICATED:
        return throwError(new EmpleadoYaExisteError(`Error: el empleado con cif ${empleado.cif}
          ya existe`, empleado));
              
      default:
        return throwError(new EmpleadosError(`Error: la operación no se ha podido completar,
          inténtelo de nuevo más tarde`, empleado));
  
    }

  }

  handleError(error: Error) {
    let message: string;
    if (error instanceof EmpleadosError) {
      message = error.message;
    } else {
      message = `Error: ha habido un problema al ejecutar la operación, por favor inténtelo
        de nuevo más tarde`;
    }
    this.mensajesService.addMensaje(message);
  }

  parseAndThrowError(error: HttpErrorResponse, empleado?: Empleado): Observable<never> {
    return this.throwError(this.parseError(error), empleado);
  }

  private parseError(error: HttpErrorResponse): EmpleadosErrorType {
    switch (error.status) {
        case 404: {
            return EmpleadosErrorType.NOT_FOUND;
        }
        case 409: {
            return EmpleadosErrorType.DUPLICATED;
        }
        default: {
            return EmpleadosErrorType.GENERIC;
        }

    }
  }
}
