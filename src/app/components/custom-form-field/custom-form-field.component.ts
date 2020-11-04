import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { defaultValidatorMessages } from '@core/const/default-validator-messages';

@Component({
  template: ``,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomFormFieldComponent {
  @Input() control: FormControl = new FormControl();
  @Input() label: string;
  @Input() placeholder: string;

  get errors(): any {
    const errors = [];

    if (this.control.errors) {
      const errorsKeys = Object.keys(this.control.errors);

      for (const key of errorsKeys) {
        const controlError = this.control.getError(key);
        if (!controlError.message) {
          controlError.message = defaultValidatorMessages[key];
        }
        errors.push({ key, ...controlError });
      }
    }

    return errors;
  }

  get isRequired(): boolean {
    if (typeof this.control.validator === 'function') {
      const validator = this.control.validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }
    return false;
  }
}
