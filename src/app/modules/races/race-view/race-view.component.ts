import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { IFlight } from '@core/interfaces/search.interfaces';

@Component({
  selector: 'app-race-view',
  templateUrl: './race-view.component.html',
  styleUrls: ['./race-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaceViewComponent implements OnInit {
  @Input() flight: IFlight;
  @Output() backToList = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log(this.flight);
  }

  onBackToList(): void {
    this.backToList.emit();
  }

}
