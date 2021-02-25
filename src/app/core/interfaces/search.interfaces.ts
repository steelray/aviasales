import { TRIP_CLASS } from '@core/enums/trip-class.enum';

export interface IPlacesParams {
  locale: string;
  term: string;
  types: string[];
}

export interface IPlace {
  cases: any;
  code: string;
  index_strings: string[];
  name: string;
  type: string;
  weight: number;
  country_name?: string;
}

export interface IFlightSearch {
  currency: string;
  currency_rates: ICurrencyRates;
  know_enlish: boolean;
  locale: string;
  passengers: IFlightSearchPassengers;
  search_id: string;
}

export interface ICurrencyRates {
  [key: string]: number;
}

export interface IFlightSearchParams {
  know_english: boolean;
  trip_class: string;
  passengers: IFlightSearchPassengers;
  segments: IFlightSearchParamsSegments[];
  currency?: string;
  locale?: string;
}

export interface IFlightSearchPassengers {
  adults?: number;
  children?: number;
  infants?: number;
}

export interface IFlightSearchParamsSegments {
  origin: string;
  destination: string;
  date: string;
}

export interface ISearchResult {
  airlines: IAirline[];
  airports: IAirport[];
  currency: string;
  filters: ISearchResultFilter;
  flights: IFlight[];
  gatesInfos: IGatesInfo[]; // agents info
  segments: ISearchResultSegments;

}

export interface IGatesInfo {
  currency_code: string;
  id: number;
  label: string;
  payment_methods: string[];
  productivity: number;
}

export interface ISearchResultFilter {
  airports: ISearchResultFilterAirports;
  /*
    * arrival_datetime_0 = туда, arrival_datetime_1 = обратно
  */
  arrival_datetime: ISearchResultFilterArrivalDateTime;
  departure_datetime?: ISearchResultFilterArrivalDateTime;
  /*
    * arrival_time_0 = туда, arrival_time_1 = обратно
  */
  arrival_time: ISearchResultFilterTime;
  /*
      * departire_time_0 = туда, departire_time_1 = обратно
    */
  departure_time: ISearchResultFilterTime;
  departure_minutes?: ISearchResultFilterArrivalDateTime;
  flights_duration: IMinMaxValues;
  price: IMinMaxValues;
}

export interface ISearchResultFilterAirports { // IATA CODES
  arrival: string[];
  departure: string[];
}

export interface ISearchResultSegments {
  to: ISearchResultSegment;
  back?: ISearchResultSegment;
}

export interface ISearchResultSegment {
  date: string;
  depart_date: string;
  destination: string;
  destination_country: string;
  origin: string;
  origin_country: string;
  original_destination: string;
  original_origin: string;
}

export interface ISearchResultFilterArrivalDateTime {
  to: IMinMaxValues;
  back?: IMinMaxValues;
}

export interface ISearchResultFilterTime {
  to: {
    max: string;
    min: string;
  };
  back?: {
    max: string;
    min: string;
  };
}

export interface IMinMaxValues {
  max: number;
  min: number;
}

export interface IAirline {
  average_rate: number;
  brand_color: string; // hex
  iata: string; // code
  id: number;
  name: string;
  rates: number; // rates count
}

export interface IAirport {
  city: string; // city name
  city_code: string; // IATA code
  country: string; // country name
  country_code: string;
  name: string;
  time_zone: string;
  cases: IAirportCase;
  iata: string; // iata code
}

export interface IAirportCase {
  po: string;
  pr: string;
  vi: string;
}

// proposals
export interface IFlight {
  carriers: string[];
  flight_weight: number;
  is_charter: boolean;
  is_direct: boolean;
  max_stop_duration: number;
  max_stops: number;
  min_stop_duration: number;
  popularity: number;
  segment: IFlightSegment;
  tags: string[];
  terms: IFlightTerms;
  total_duration: number;
  price: number; // converted price
}

export interface IFlightSegment {
  to: IFlightSegmentToBack; // туда
  back?: IFlightSegmentToBack; // обратно(если в поиске был указан дата возвращения)
}
export interface IFlightSegmentToBack {
  departure: string; // airport iata code
  arrival: string; // airport iata code
  departure_timestamp: number;
  arrival_timestamp: number;
  total_duration: number; // the sum of minutes of all races
  transfers_total_duration?: number; // all transfers duration seconds sum
  races: IRace[];
}

export interface IFlightTerms {
  currency: string;
  flight_additional_tariff_infos?: string[];
  flights_baggage: string[];
  flights_handbags: string[];
  price: number;
  unified_price: number; // базовая цена(всегдя в рублях)
  url: number;
}

export interface IRace {
  name: string; // operating_carrier + number
  arrival: string; //  IATA code
  arrival_date: string;
  arrival_time: string;
  arrival_timestamp: number;
  delay: number;
  departure: string; // IATA code
  departure_date: string;
  departure_time: string;
  departure_timestamp: number;
  duration: number;
  rating: number;
  trip_class: TRIP_CLASS;
  transfers?: IRaceTransfer[]; // segment transfers
  aircraft?: string;
  local_arrival_timestamp?: number;
  local_departure_timestamp?: number;
}


export interface IRaceTransfer {
  duration: number; // seconds
  at: string; // IATA airport code
  city_code: string; // IATA city code
  country_code: string; // IATA country code
  night_transfer: boolean;
  tags: string[];
  visa_rules: {
    required: boolean;
  };
}
