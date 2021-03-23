import { IPlacesParams } from "@core/interfaces/search.interfaces";
import { getLangFromParams } from "@core/utils/get-lang.util";

export const placesParams: IPlacesParams = {
  locale: getLangFromParams(),
  term: '',
  types: [
    'city',
  ]
};
