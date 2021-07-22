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
  id: string;
  tienda_nombre: string;
  tienda_clave: string;
  cadena_nombre: CadenaNombre;
  img_cadena: string;
  porcentaje: number;
}

export enum CadenaNombre {
  Ba = 'BA',
  Supercenter = 'Supercenter',
  WalmartExpress = 'Walmart Express',
}

export enum ImgCadena {
  BaPNG = 'ba.png',
  WePNG = 'we.png',
  WmPNG = 'wm.png',
}
