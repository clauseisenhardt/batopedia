import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import * as PhotosActions from './photo.actions';
import { Photo } from '../photo.model';
import * as fromApp from '../../store/app.reducer';
import { environment } from '../../../environments/environment';

@Injectable()
export class PhotoEffects {
  @Effect()
  fetchPhotos = this.actions$.pipe(
    ofType(PhotosActions.FETCH_PHOTOS),
    switchMap(() => {
      return this.http.get<Photo[]>(
        environment.batopediaHttpURL + 'photos.json'
        // 'https://ng-course-photo-book-65f10.firebaseio.com/photos.json'
      );
    }),
    map(photos => {
      console.log('photos: ' + photos.toString());
      console.log('photos[0]: ' + photos[0]);
      console.log('photos[0].species: ' + photos[0].species);
      return photos.map(photo => {
        console.log('Photo: ' + photo);
        return {
          ...photo
        };
      });
    }),
    map(photos => {
      console.log('photos[0].species: ' + photos[0].species);
      return new PhotosActions.SetPhotos(photos);
    })
  );

  @Effect({dispatch: false})
  storePhotos = this.actions$.pipe(
    ofType(PhotosActions.STORE_PHOTOS),
    withLatestFrom(this.store.select('photos')),
    switchMap(([actionData, photosState]) => {
      return this.http.put(
        environment.batopediaHttpURL + 'photos.json',
        // 'https://ng-course-photo-book-65f10.firebaseio.com/photos.json',
        photosState.photos
      );
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
