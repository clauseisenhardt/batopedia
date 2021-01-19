import { Species } from '../species.model';
import * as SpeciesActions from './species.actions';

export interface State {
  speciesList: Species[];
  editedSpecies: Species;
  editedSpeciesIndex: number;
}

const initialState: State = {
  speciesList: [
    new Species('Langøret flagermus',
    'Langøret flagermus (Plecotus auritus) er en flagermus, der er forholdsvis almindelig i Danmark. Den yngler f.eks. i kirketårne, redekasser, hule træer, kældre og stalde.',
    'https://upload.wikimedia.org/wikipedia/commons/4/4e/Plecotus_auritus_2013-2_%28cropped%29.jpg'),
    new Species('Dværgflagermus',
    'Dværgflagermusen (Pipistrellus pygmaeus) er en flagermus, der er udbredt i Europa og muligvis længere mod øst. I Danmark er den almindelig. Den kan kun skelnes fra pipistrelflagermusen på forskelle i ultralydsskriget og DNA.',
    'https://upload.wikimedia.org/wikipedia/commons/9/99/Pipistrellus_pygmaeus_03.jpg')
  ],
  editedSpecies: null,
  editedSpeciesIndex: -1
};

export function speciesReducer(
  state: State = initialState,
  action: SpeciesActions.SpeciesActions
) {
  switch (action.type) {
    case SpeciesActions.ADD_SPECIES:
      return {
        ...state,
        speciesList: [...state.speciesList, action.payload]
      };
    case SpeciesActions.ADD_SPECIES_LIST:
      return {
        ...state,
        speciesList: [...state.speciesList, ...action.payload]
      };
    case SpeciesActions.UPDATE_SPECIES:
      const species = state.speciesList[state.editedSpeciesIndex];
      const updatedSpecies = {
        ...species,
        ...action.payload
      };
      const updatedSpeciesList = [...state.speciesList];
      updatedSpeciesList[state.editedSpeciesIndex] = updatedSpecies;

      return {
        ...state,
        speciesList: updatedSpeciesList,
        editedSpeciesIndex: -1,
        editedSpecies: null
      };
    case SpeciesActions.DELETE_SPECIES:
      return {
        ...state,
        speciesList: state.speciesList.filter((ig, igIndex) => {
          return igIndex !== state.editedSpeciesIndex;
        }),
        editedSpeciesIndex: -1,
        editedSpecies: null
      };
    case SpeciesActions.START_EDIT:
      return {
        ...state,
        editedSpeciesIndex: action.payload,
        editedSpecies: { ...state.speciesList[action.payload] }
      };
    case SpeciesActions.STOP_EDIT:
      return {
        ...state,
        editedSpecies: null,
        editedSpeciesIndex: -1
      };
    default:
      return state;
  }
}
