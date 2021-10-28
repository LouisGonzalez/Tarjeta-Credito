import { Usuario } from './usuario.model'
import { TipoCuenta } from './tipo_cuenta.model'
import { Deshabilitacion } from './deshabilitacion.model'
import { Eliminacion } from './eliminacion.model'

export class Tarjeta {
    tarjeta_id: number;
    numero_tarjeta: string;
    cvv: string;
    fecha_vencimiento: string;
    notifyme: boolean;
    saldo: number;
    limite: number;
    Usuario: Usuario;
    Tipo_cuentum: TipoCuenta;
    Deshabilitacions: Deshabilitacion[];
    Eliminacions: Eliminacion[];
    Transaccions: Transaccions[]
}

export class Transaccions {
    transaccion_id: number;
    monto: number;
    fecha: string;
    es_Aumento: Boolean;
    tarjeta_id: number
}

export class CrearTarjeta {
    numero_tarjeta: string;
    cvv: string;
    fecha_vencimiento: Date;
    notifyme: boolean;
    limite: number;
    saldo: number;
    usuario_id: number;
    tipo_cuenta_id: number;
}
export class T {
    numero_tarjeta: '';
    motivo: '';
    fecha: null;
}