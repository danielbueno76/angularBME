import { Empleado } from './empleado';

export enum EmpleadosErrorType {
    GENERIC,
    NOT_FOUND,
    DUPLICATED
}

export class EmpleadosError extends Error {

    empleado: Empleado;

    constructor(message?: string, empleado?: Empleado) {
        super(message);
        this.empleado = empleado;
    }
}

export class EmpleadoYaExisteError extends EmpleadosError {

}

export class EmpleadoNoEncontradoError extends EmpleadosError {

}