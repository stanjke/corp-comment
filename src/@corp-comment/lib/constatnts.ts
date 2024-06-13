export const MAX_CHARACTERS = 150;
export const API_PORT = '3000';
export const API_URL = `http://127.0.0.1:${API_PORT}/api`;

export enum ENDPOINT {
  POSTS = '/comment',
  USER = '/user',
}

export enum COMMENT_ENDPOINT {
  GET_COMMENT = '/',
  CREATE_COOMENT = '/create',
  DELETE_COMMENT = '/delete',
}
