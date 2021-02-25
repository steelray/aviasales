import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IAirline, ISearchResultSegments } from '@core/interfaces/search.interfaces';
import { RaceFilterChecboxesGroupComponent } from '../race-filter-checkboxes-group.component';

@Component({
  selector: 'app-race-filter-airline',
  templateUrl: './race-filter-airline.component.html',
  styleUrls: ['./race-filter-airline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaceFilterAirlineComponent extends RaceFilterChecboxesGroupComponent {
  @Input() control = new FormControl();
  @Input() airlines: IAirline[];
  @Input() searchSegments: ISearchResultSegments;
}
