import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-race-filter-baggage',
  templateUrl: './race-filter-baggage.component.html',
  styleUrls: ['./race-filter-baggage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaceFilterBaggageComponent {
  @Input() control = new FormControl();
  changeAll(event): void {
    console.log(event)
  }
}
