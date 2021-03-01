import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, Inject } from '@angular/core';
import { IFlight, ISearchResult } from '@core/interfaces/search.interfaces';

@Component({
  selector: 'app-race-view',
  templateUrl: './race-view.component.html',
  styleUrls: ['./race-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaceViewComponent implements OnInit {
  @Input() flight: IFlight;
  @Input() searchResult: ISearchResult;
  @Output() backToList = new EventEmitter();
  @Output() buyClicked = new EventEmitter();

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  onBackToList(): void {
    this.backToList.emit();
  }

  viewDetails(event: Event): void {
    event.preventDefault();
  }

  onBuy(): void {
    this.buyClicked.emit(this.flight.terms.url);
  }

}
