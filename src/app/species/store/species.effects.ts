import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import * as SpeciesActions from './species.actions';
import { Species } from '../species.model';
import * as fromApp from '../../store/app.reducer';
import { environment } from '../../../environments/environment';

@Injectable()
export class SpeciesEffects {
  @Effect()
  fetchSpecies = this.actions$.pipe(
    ofType(SpeciesActions.FETCH_SPECIES),
    switchMap(() => {
      return this.http.get<Species[]>(
        environment.batopediaHttpURL + 'species.json'
        // 'https://ng-course-specie-book-65f10.firebaseio.com/species.json'
      );
    }),
    map(species => {
      console.log('speciesArray: ' + species.toString());
      console.log('speciesArray[0]: ' + species[0]);
      //console.log('speciesArray[dværgflagermus]: ' + species['dværgflagermus']);
      return species.map(species => {
        console.log('Species: ' + species);
        return {
          ...species
        };
      });
    }),
    map(speciesList => {
      console.log('speciesList: ' + speciesList.toString());
      //console.log('speciesList[vandflagermus]: ' + speciesList['vandflagermus'].toString());
      //console.log('speciesList[vandflagermus].name: ' + speciesList['vandflagermus'].name);
      return new SpeciesActions.SetSpecies(speciesList);
    })
  );

  @Effect({dispatch: false})
  storeSpecies = this.actions$.pipe(
    ofType(SpeciesActions.STORE_SPECIES),
    withLatestFrom(this.store.select('species')),
    switchMap(([actionData, speciesState]) => {
      // let speciesList = this.removeDuplicates(speciesState.speciesList);
      // let jsonObject = {};
      // speciesList.forEach(
      //     item => jsonObject[
      //         item.name.toString()
      //         .replace(/\s/g, "").toLowerCase()
      //     ] = item);
      // let json = JSON.stringify(jsonObject);
      return this.http.put(
        environment.batopediaHttpURL + 'species.json',
        // 'https://ng-course-specie-book-65f10.firebaseio.com/species.json',
        // json
        speciesState.speciesList
      );
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  private removeDuplicates(input) {
    let valuesAlreadySeen = [];
    let output = [];
    for (let i = 0; i < input.length; i++) {
      let value = input[i].name.toString()
      .replace(/\s/g, "").toLowerCase()
      if (valuesAlreadySeen.indexOf(value) === -1) {
        valuesAlreadySeen.push(value);
        output.push(input[i]);
      }
      else {
        console.log('Species not saved: ' + input[i]);
      }
    }
    return output;
  }

  private checkForDuplicates(array) {
    let valuesAlreadySeen = []

    for (let i = 0; i < array.length; i++) {
      let value = array[i].name.toString()
      .replace(/\s/g, "").toLowerCase()
      if (valuesAlreadySeen.indexOf(value) !== -1) {
        return true
      }
      valuesAlreadySeen.push(value)
    }
    return false
  }
}
