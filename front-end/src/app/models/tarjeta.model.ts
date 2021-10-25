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
    Usuario: Usuario;
    Tipo_cuentum: TipoCuenta;
    Deshabilitacions: Deshabilitacion[];
    Eliminacions: Eliminacion[];
}

export class CrearTarjeta {
    numero_tarjeta: string;
    cvv: string;
    fecha_vencimiento: string;
    notifyme: boolean;
    limite: number;
    saldo: number;
    usuario_id: number;
    tipo_cuenta_id: number;
}