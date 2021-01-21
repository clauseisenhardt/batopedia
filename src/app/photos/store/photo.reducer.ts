import { Photo } from '../photo.model';
import * as PhotosActions from './photo.actions';

export interface State {
  photos: Photo[];
}

const initialState: State = {
  photos: [
    new Photo('Skimmelflagermus',
    // 'Skimmelflagermusen er en flagermus i familien barnæser. Den er udbredt i store dele af Europa og Asien. I Danmark er den almindelig i Nordøstsjælland, hvor den om sommeren jager insekter højt over søer eller det åbne land og i vinterhalvåret findes i høje bygninger.',
    'DK',
    'https://upload.wikimedia.org/wikipedia/commons/3/33/Microchiroptera.JPG'),
    new Photo('Vandflagermus',
    // 'Vandflagermusen er en flagermus i familien barnæser. Den er vidt udbredt i Europa og Asien og er en af de almindeligste flagermus i Danmark. Den er kendt for at jage tæt hen over vandfladen på søer, åer, voldgrave og brakvandsfjorde. Tusinder overvintrer hvert år i de jyske kalkgruber, især Daugbjerg Kalkgruber.',
    'DK',
    'https://upload.wikimedia.org/wikipedia/commons/2/2f/Myotis_daubentoni.jpg'),
    new Photo('Vandflagermus',
    'Aalborg',
    'https://upload.wikimedia.org/wikipedia/commons/e/e8/XN_Myotis_daubentonii_157.jpg'),
    new Photo('Flying fox',
    // Flying fox flying off tree at the Royal Botanic Gardens, Sydney, Australia. Shot taken in 26/5/2007 by Daniel Vianna.
    'Botanical Gardens, Sydney, Australia',
    'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Flying_bat_with_tree_crop.JPG/800px-Flying_bat_with_tree_crop.JPG')
  ]
};

export function photoReducer(
  state = initialState,
  action: PhotosActions.PhotosActions
) {
  switch (action.type) {
    case PhotosActions.SET_PHOTOS:
      return {
        ...state,
        photos: [...action.payload]
      };
    case PhotosActions.ADD_PHOTO:
      return {
        ...state,
        photos: [...state.photos, action.payload]
      };
    case PhotosActions.UPDATE_PHOTO:
      const updatedPhoto = {
        ...state.photos[action.payload.index],
        ...action.payload.newPhoto
      };

      const updatedPhotos = [...state.photos];
      updatedPhotos[action.payload.index] = updatedPhoto;

      return {
        ...state,
        photos: updatedPhotos
      };
    case PhotosActions.DELETE_PHOTO:
      return {
        ...state,
        photos: state.photos.filter((photo, index) => {
          return index !== action.payload;
        })
      };
    default:
      return state;
  }
}
