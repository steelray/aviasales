import {
  IAirline,
  IAirport,
  IFlight,
  IFlightSearch,
  IFlightSegment,
  IFlightSegmentToBack,
  IFlightTerms,
  IGatesInfo,
  IMinMaxValues,
  IRace,
  IRaceTransfer,
  ISearchResult,
  ISearchResultFilter,
  ISearchResultFilterArrivalDateTime,
  ISearchResultFilterTime
} from '@core/interfaces/search.interfaces';
declare var fx: any;
export class SearchResult implements ISearchResult {
  airlines: IAirline[] = [];
  airports: IAirport[] = [];
  currency: string = null;
  filters: ISearchResultFilter = null;
  flights: IFlight[] = [];
  gatesInfos: IGatesInfo[] = [];

  fxFn: any;

  constructor(
    result: any,
    flightSearchRequestResult: IFlightSearch) {
    this.initFxFn(flightSearchRequestResult.currency_rates);
    this.prepareResults(result);
  }

  initFxFn(rates): void {
    fx.base = 'rub';
    fx.rates = rates;
    this.fxFn = fx;
  }


  private prepareResults(result: any): void {
    if (!result || !Array.isArray(result)) {
      return;
    }
    let proposals = [];
    result.forEach(res => {
      this.airlines = this.pushOnlyUniquesObjArray(this.airlines, Object.values(res.airlines), 'iata');

      this.airports = this.pushOnlyUniquesObjArray(this.airports, Object.values(res.airports), 'name');

      this.currency = res.currency;



      this.filters = this.prepareFilters(res);
      this.gatesInfos.push(this.getGatesInfo(res));


      proposals = proposals.concat(this.prepareFlights(res.proposals));

    });
    this.flights = proposals;
  }


  private getGatesInfo(res: any): IGatesInfo {
    return Object.values(res.gates_info)[0] as IGatesInfo;
  }

  private prepareFilters(result: any): ISearchResultFilter {
    const newFilters = result.filters_boundary;
    // tslint:disable-next-line:no-string-literal
    const gateCurrency = Object.values(result.gates_info)[0]['currency_code']; // валюта у каждоого агенства может быть свой

    const newFiltersPrice: IMinMaxValues = {
      min: this.convertPriceToUzs(newFilters.price.min, gateCurrency),
      max: this.convertPriceToUzs(newFilters.price.max, gateCurrency)
    };

    const res: ISearchResultFilter = this.filters ? this.filters : this.setFiltersDefaultValues();
    res.airports.arrival = this.pusOnlyUniques(res.airports.arrival, newFilters.airports.arrival);
    res.airports.departure = this.pusOnlyUniques(res.airports.departure, newFilters.airports.departure);
    res.arrival_datetime = this.prepareFilterArrivalDateTime(newFilters, res.arrival_datetime);
    res.arrival_time = this.prepareFilterArrivalTime(newFilters, res.arrival_time);
    res.departure_time = this.prepareFilterDepartureTime(newFilters, res.departure_time);
    res.flights_duration = this.prepareFlightsDuration(newFilters.flights_duration, res.flights_duration);
    res.price = this.prepareFilterPrice(newFiltersPrice, res.price);
    return res;
  }

  private setFiltersDefaultValues(): ISearchResultFilter {
    return {
      airports: {
        arrival: [],
        departure: []
      },
      arrival_datetime: {
        back: {
          max: 0,
          min: 0
        },
        to: {
          max: 0,
          min: 0
        }
      },
      arrival_time: {
        to: {
          max: '',
          min: '',
        },
        back: {
          max: '',
          min: '',
        }
      },
      departure_time: {
        to: {
          max: '',
          min: '',
        },
        back: {
          max: '',
          min: ''
        },
      },
      flights_duration: {
        max: 0,
        min: 0,
      },
      price: {
        max: 0,
        min: 0,
      }
    };
  }

  private prepareFilterArrivalDateTime(
    filters: any, currentDateTime: ISearchResultFilterArrivalDateTime
  ): ISearchResultFilterArrivalDateTime {

    if (filters.arrival_datetime_0.max > currentDateTime.back.max) {
      currentDateTime.back.max = filters.arrival_datetime_0.max;
    }

    if (!currentDateTime.back.min || filters.arrival_datetime_0.min < currentDateTime.back.min) {
      currentDateTime.back.min = filters.arrival_datetime_0.min;
    }

    if (filters.arrival_datetime_1) {
      if (filters.arrival_datetime_1.max > currentDateTime.to.max) {
        currentDateTime.to.max = filters.arrival_datetime_1.max;
      }

      if (!currentDateTime.to.min || filters.arrival_datetime_1.min < currentDateTime.to.min) {
        currentDateTime.to.min = filters.arrival_datetime_1.min;
      }
    }

    return currentDateTime;
  }

  private prepareFilterArrivalTime(
    filters: any, currentTime: ISearchResultFilterTime
  ): ISearchResultFilterTime {

    if (filters.arrival_time_0.max > currentTime.back.max) {
      currentTime.back.max = filters.arrival_time_0.max;
    }

    if (!currentTime.back.min || filters.arrival_time_0.min < currentTime.back.min) {
      currentTime.back.min = filters.arrival_time_0.min;
    }

    if (filters.arrival_time_1) {
      if (filters.arrival_time_1.max > currentTime.to.max) {
        currentTime.to.max = filters.arrival_time_1.max;
      }

      if (!currentTime.to.min || filters.arrival_time_1.min < currentTime.to.min) {
        currentTime.to.min = filters.arrival_time_1.min;
      }
    }

    return currentTime;
  }

  private prepareFilterDepartureTime(
    filters: any, currentTime: ISearchResultFilterTime
  ): ISearchResultFilterTime {

    if (filters.departure_time_0.max > currentTime.back.max) {
      currentTime.back.max = filters.departure_time_0.max;
    }

    if (!currentTime.back.min || filters.departure_time_0.min < currentTime.back.min) {
      currentTime.back.min = filters.departure_time_0.min;
    }

    if (filters.departure_time_1) {
      if (filters.departure_time_1.max > currentTime.to.max) {
        currentTime.to.max = filters.departure_time_1.max;
      }

      if (!currentTime.to.min || filters.departure_time_1.min < currentTime.to.min) {
        currentTime.to.min = filters.departure_time_1.min;
      }
    }

    return currentTime;
  }

  private prepareFilterPrice(price: IMinMaxValues, currentPrice: IMinMaxValues): IMinMaxValues {
    if (currentPrice.max < price.max) {
      currentPrice.max = price.max;
    }
    if (!currentPrice.min || price.min < currentPrice.min) {
      currentPrice.min = price.min;
    }
    return currentPrice;
  }

  private prepareFlightsDuration(durations: IMinMaxValues, currentDurations: IMinMaxValues): IMinMaxValues {
    if (currentDurations.max < durations.max) {
      currentDurations.max = durations.max;
    }
    if (!currentDurations.min || durations.min < currentDurations.min) {
      currentDurations.min = durations.min;
    }
    return currentDurations;
  }

  private prepareFlights(proposals: any): IFlight[] {
    const res: IFlight[] = [];

    for (const proposal of proposals) {
      const {
        carriers,
        flight_weight,
        is_charter,
        is_direct,
        max_stop_duration,
        max_stops,
        min_stop_duration,
        popularity,
        segment,
        tags,
        total_duration
      } = proposal;
      const terms = this.prepareFlightTerms(proposal.terms);
      const flight: IFlight = {
        carriers,
        flight_weight,
        is_charter,
        is_direct,
        max_stop_duration,
        max_stops,
        min_stop_duration,
        popularity,
        tags,
        terms,
        total_duration,
        segment: {
          to: this.prepareFlightRaces(segment[0])
        },
        price: this.convertPriceToUzs(terms.price, terms.currency)
      };
      // если есть обратный рейс
      if (segment[1]) {
        flight.segment.back = this.prepareFlightRaces(segment[1]);

      }
      res.push(flight);
    }
    return res;
  }

  private prepareFlightRaces(segment: any): IFlightSegmentToBack {
    const flights = segment.flight; // несколько рейсов === полёт с пересадками
    const transfers = segment?.transfers;
    const res: IFlightSegmentToBack = {
      departure: flights[0].departure,
      arrival: flights[flights.length - 1].arrival,
      departure_timestamp: flights[0].local_departure_timestamp,
      arrival_timestamp: flights[flights.length - 1].local_arrival_timestamp,
      total_duration: flights.reduce((accumulator, currentValue) => accumulator + currentValue.duration, 0),
      races: []
    };
    if (transfers) {
      res.transfers_total_duration = transfers.reduce((accumulator, currentValue) => accumulator + currentValue.duration_seconds, 0);
    }
    for (const flight of flights) {
      res.races.push({
        name: `${flight.operating_carrier} ${flight.number}`, // operating_carrier + number
        aircraft: flight.aircraft,
        arrival: flight.arrival, //  IATA code
        arrival_date: flight.arrival_date,
        arrival_time: flight.arrival_time,
        arrival_timestamp: flight.arrival_timestamp,
        delay: flight.delay,
        departure: flight.departure, // IATA code
        departure_date: flight.departure_date,
        departure_time: flight.departure_time,
        departure_timestamp: flight.departure_timestamp,
        duration: flight.duration,
        local_arrival_timestamp: flight.local_arrival_timestamp,
        local_departure_timestamp: flight.local_departure_timestamp,
        rating: flight.rating,
        trip_class: flight.trip_class,
        transfers: this.prepareRaceTransfers(transfers), // race transfers
      });
    }
    return res;
  }

  private prepareRaceTransfers(transfers: any): IRaceTransfer[] {
    if (!transfers) {
      return [];
    }
    return null;
  }

  private prepareFlightTerms(terms: any): IFlightTerms {
    return Object.values(terms)[0] as IFlightTerms;
  }

  private pushOnlyUniquesObjArray(array: any, mergeArray: any, compareKey: string): [] {
    mergeArray.forEach(value => {
      if (!array.find(item => item[compareKey] === value[compareKey])) {
        array.push(value);
      }
    });
    return array;
  }

  private pusOnlyUniques(array: any[], mergeArray: any[]): any[] {
    mergeArray.forEach(value => {
      if (!array.find(item => value === item)) {
        array.push(value);
      }
    });
    return array;
  }


  private convertPriceToUzs(price: number, currency: string): number {
    return Math.round(fx(price).from('uzs').to(currency));
  }
}
