import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgOnDestroy } from '@core/services/destroy.service';

@Component({
  selector: 'app-race-ticket',
  templateUrl: './race-ticket.component.html',
  styleUrls: ['./race-ticket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgOnDestroy]
})
export class RaceTicketComponent { }
