import { Component, OnInit, ChangeDetectionStrategy, Self } from '@angular/core';
import { NgOnDestroy } from '@core/services/destroy.service';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgOnDestroy]
})
export class RacesComponent implements OnInit {

  constructor(
    @Self() private onDestroy$: NgOnDestroy
  ) { }

  ngOnInit(): void {

  }

}
