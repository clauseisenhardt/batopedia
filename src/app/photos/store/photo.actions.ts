import { Action } from '@ngrx/store';

import { Photo } from '../photo.model';

export const SET_PHOTOS = '[Photos] Set Photos';
export const FETCH_PHOTOS = '[Photos] Fetch Photos';
export const ADD_PHOTO = '[Photo] Add Photo';
export const UPDATE_PHOTO = '[Photo] Update Photo';
export const DELETE_PHOTO = '[Photo] Delete Photo';
export const STORE_PHOTOS = '[Photo] Store Photos';

export class SetPhotos implements Action {
  readonly type = SET_PHOTOS;

  constructor(public payload: Photo[]) {}
}

export class FetchPhotos implements Action {
  readonly type = FETCH_PHOTOS;
}

export class AddPhoto implements Action {
  readonly type = ADD_PHOTO;

  constructor(public payload: Photo) {}
}

export class UpdatePhoto implements Action {
  readonly type = UPDATE_PHOTO;

  constructor(public payload: { index: number; newPhoto: Photo }) {}
}

export class DeletePhoto implements Action {
  readonly type = DELETE_PHOTO;

  constructor(public payload: number) {}
}

export class StorePhotos implements Action {
  readonly type = STORE_PHOTOS;
}

export type PhotosActions =
  | SetPhotos
  | FetchPhotos
  | AddPhoto
  | UpdatePhoto
  | DeletePhoto
  | StorePhotos;
