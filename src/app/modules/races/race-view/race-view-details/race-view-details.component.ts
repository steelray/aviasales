import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BEVERAGE_TYPES } from '@core/enums/beverage-type.enum';
import { TRIP_CLASS } from '@core/enums/trip-class.enum';
import { IRace, IRaceDetail } from '@core/interfaces/search.interfaces';

@Component({
  selector: 'app-race-view-details',
  templateUrl: './race-view-details.component.html',
  styleUrls: ['./race-view-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaceViewDetailsComponent implements OnInit {
  @Input() race: IRace;
  @Input() tripClass: TRIP_CLASS;
  @Input() flightInfos: any;
  beverageTypes = BEVERAGE_TYPES;

  details: IRaceDetail;

  constructor() { }

  ngOnInit(): void {
    const infoKey = `${this.tripClass}${this.race.name.replace(' ', '')}`;
    const info = this.flightInfos[infoKey];

    if (info) {
      this.details = {
        amenities: {
          food: {
            exists: info.amenities.food.exists,
            paid: info.amenities.food.paid,
          },
          power: {
            exists: info.amenities.power.exists,
            paid: info.amenities.power.paid,
          },
          wifi: {
            exists: info.amenities.wifi.exists,
            paid: info.amenities.wifi.paid,
          },
          beverage: {
            exists: info.amenities.beverage.exists,
            type: info.amenities.beverage.type,
            alcoholic_paid: info.amenities.beverage.alcoholic_paid,
            nonalcoholic_paid: info.amenities.beverage.nonalcoholic_paid,
          },
        },
        seat: {
          pitch: info.seat.pitch,
          type: info.seat.type,
          width: info.seat.width,
          width_description: info.seat.width_description,
        }
      };
    }

  }

}
