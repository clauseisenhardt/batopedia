import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Photo } from './photo.model';
import * as fromApp from '../store/app.reducer';
import * as PhotosActions from '../photos/store/photo.actions';

@Injectable({ providedIn: 'root' })
export class PhotosResolverService implements Resolve<Photo[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.dataStorageService.fetchPhotos();
    return this.store.select('photos').pipe(
      take(1),
      map(photosState => {
        return photosState.photos;
      }),
      switchMap(photos => {
        if (photos.length === 0) {
          this.store.dispatch(new PhotosActions.FetchPhotos());
          return this.actions$.pipe(
            ofType(PhotosActions.SET_PHOTOS),
            take(1)
          );
        } else {
          return of(photos);
        }
      })
    );
  }
}
