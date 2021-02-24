import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IAirport } from '@core/interfaces/search.interfaces';
import { ISelectOption } from '@core/interfaces/select-option.interface';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-race-filter-airport',
  templateUrl: './race-filter-airport.component.html',
  styleUrls: ['./race-filter-airport.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaceFilterAirportComponent implements OnInit {
  @Input() control = new FormControl();
  @Input() airports: IAirport[];
  filteredOptions: Observable<ISelectOption[]>;
  options: ISelectOption[];

  ngOnInit(): void {
    this.options = this.airports.map(airport => this.prepareOption(airport));
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      // tap(res => console.log(res)),
      map(value => this._filter(value))
    );
  }

  displayWithFn(option: ISelectOption): string {
    return option?.title || null;
  }

  private _filter(value: ISelectOption | string): ISelectOption[] {
    if (!value) {
      return this.options;
    }
    const filterValue = typeof value === 'object' ? value.title.toLowerCase() : value.toLowerCase();
    return this.options
      .filter(option => option.title.toLowerCase().indexOf(filterValue) === 0);
  }

  private prepareOption(airport: IAirport): ISelectOption {
    return {
      value: airport.iata,
      title: airport.name
    };
  }

}
