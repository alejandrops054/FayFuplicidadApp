import {ReactElement, ReactNode} from 'react';

// Generated by https://quicktype.io
export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  has2FA: boolean;
  img?: string;
}

//Tiendas
// Generated by https://quicktype.io
export interface TiendasResponse {
  camp_nombre: ReactNode;
  tiendas: Tienda[];
  cadena_nombre: any;
  id: string;
  tienda_id: string;
  tienda_nombre: string;
  tienda_clave: string;
  cadena: CadenaNombre;
  camps: CampsResponse[];
  img_cadena: string;
  porcentaje: number;
  concepto: string;
  info_id: number;
}

export interface Tienda {
  camp_nombre: string;
  id: string;
  tienda_id: string;
  tienda_nombre: string;
  tienda_clave: string;
  cadena: CadenaNombre;
  img_cadena: string;
  cadena_nombre: string;
  porcentaje: number;
  concepto: string;
  info_id: number;
  nombre: string;
  clave: string;
}

export enum CadenaNombre {
  Ba = 'BA',
  Supercenter = 'Supercenter',
  WalmartExpress = 'Walmart Express',
  cadena = 'cadena',
}

export enum ImgCadena {
  BaPNG = 'ba.png',
  WePNG = 'we.png',
  WmPNG = 'wm.png',
}

//Campaña
// Generated by https://quicktype.io

export interface CampsResponse {
  camp: any;
  tienda_id: string;
  tiendas: Tienda[];
  camp_nombre: string;
  concepto: string;
  info_id: number;
  cadena: Datum[];
}

export interface Datum {
  tienda_id: string;
  camp_nombre: string;
  concepto: string;
  info_id: number;
}

//Detalles
// Generated by https://quicktype.io

export interface DetallesResponse {
  id: string;
  camp: string;
  tienda: string;
  clave: string;
  detalles: string;
  concepto: string;
  comentario: string;
}

//Claves
// Generated by https://quicktype.io

export interface ClavesResponse {
  id: number;
  nombre: string;
  descripcion: string;
}
