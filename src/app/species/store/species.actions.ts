import { Action } from '@ngrx/store';

import { Species } from '../species.model';

export const ADD_SPECIES = '[Species] Add Species';
export const ADD_SPECIES_LIST = '[Species] Add Species List';
export const UPDATE_SPECIES = '[Species] Update Species';
export const DELETE_SPECIES = '[Species] Delete Species';
export const START_EDIT = '[Species] Start Edit';
export const STOP_EDIT = '[Species] Stop Edit';
export const FETCH_SPECIES = '[Species] Fetch Species';
export const STORE_SPECIES = '[Species] Store Species';
export const SET_SPECIES = '[Species] Set Species';

export class AddSpecies implements Action {
  readonly type = ADD_SPECIES;

  constructor(public payload: Species) {}
}

export class AddSpeciesList implements Action {
  readonly type = ADD_SPECIES_LIST;

  constructor(public payload: Species[]) {}
}

export class UpdateSpecies implements Action {
  readonly type = UPDATE_SPECIES;

  constructor(public payload: Species ) {}
}

export class DeleteSpecies implements Action {
  readonly type = DELETE_SPECIES;
}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export class StoreSpecies implements Action {
  readonly type = STORE_SPECIES;
}

export class SetSpecies implements Action {
  readonly type = SET_SPECIES;

  constructor(public payload: Species[]) {}
}
export class FetchSpecies implements Action {
  readonly type = FETCH_SPECIES;
}

export type SpeciesActions =
  | AddSpecies
  | AddSpeciesList
  | UpdateSpecies
  | DeleteSpecies
  | StartEdit
  | StopEdit
  | StoreSpecies
  | SetSpecies
  | FetchSpecies;
