import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ISelectOption } from '@core/interfaces/select-option.interface';
import { CustomFormFieldComponent } from '../custom-form-field/custom-form-field.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends CustomFormFieldComponent {
  @Input() options: ISelectOption[];
  @Input() prompt: string;

  trackByFn(index: number, item: any): number {
    return index;
  }
}
