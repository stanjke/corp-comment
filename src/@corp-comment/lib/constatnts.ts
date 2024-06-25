const API_PORT = '3000';
export const MAX_CHARACTERS = 150;
export const API_URL = `http://127.0.0.1:${API_PORT}/api`;

export enum ENDPOINT {
  COMMENT = '/comment',
  USER = '/user',
}

export enum COMMENT_ENDPOINT {
  GET_COMMENT = '/',
  CREATE_COOMENT = '/create',
  DELETE_COMMENT = '/delete',
}

export enum USER_ENDPOINT {
  LOGIN = '/login',
  USER = '/user',
}
