import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IAirport, ISearchResultFilterAirports, ISearchResultSegments } from '@core/interfaces/search.interfaces';
import { RaceFilterChecboxesGroupComponent } from '../race-filter-checkboxes-group.component';

@Component({
  selector: 'app-race-filter-airport',
  templateUrl: './race-filter-airport.component.html',
  styleUrls: ['./race-filter-airport.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaceFilterAirportComponent extends RaceFilterChecboxesGroupComponent {
  @Input() form: FormGroup;
  @Input() allAirports: IAirport[];
  @Input() filterAirports: ISearchResultFilterAirports;
  @Input() searchSegments: ISearchResultSegments;
}
