import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { CustomFormFieldComponent } from '../custom-form-field/custom-form-field.component';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerComponent extends CustomFormFieldComponent {
  @Input() minDate;
}
