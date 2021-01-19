import { ActionReducerMap } from '@ngrx/store';

import * as fromSpecies from '../species/store/species.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromPhotos from '../photos/store/photo.reducer';

export interface AppState {
  species: fromSpecies.State;
  auth: fromAuth.State;
  photos: fromPhotos.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  species: fromSpecies.speciesReducer,
  auth: fromAuth.authReducer,
  photos: fromPhotos.photoReducer
};
