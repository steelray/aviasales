import { IPlacesParams } from "@core/interfaces/search.interfaces";

export const placesParams: IPlacesParams = {
  locale: 'ru',
  term: '',
  types: [
    'airport',
    'city',
    'country'
  ]
};
