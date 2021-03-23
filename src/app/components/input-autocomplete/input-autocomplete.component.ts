import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CustomFormFieldComponent } from '@components/custom-form-field/custom-form-field.component';
import { ISelectOption } from '@core/interfaces/select-option.interface';
import { NgOnDestroy } from '@core/services/destroy.service';

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgOnDestroy]
})
export class InputAutocompleteComponent extends CustomFormFieldComponent {
  @Input() options: ISelectOption[];
  optionIsSelected = false;

  displayWithFn(option: ISelectOption): string {
    return option.title;
  }

  optionSelected(): void {
    this.optionIsSelected = true;
  }


  onBlur(value: string): void {
    // controller value must be selected from options
    if (this.control.value && typeof this.control.value === 'string') {
      this.control.setValue('');
    }
  }
}
