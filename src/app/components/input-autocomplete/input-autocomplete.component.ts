import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomFormFieldComponent } from '@components/custom-form-field/custom-form-field.component';
import { ISelectOption } from '@core/interfaces/select-option.interface';
import { NgOnDestroy } from '@core/services/destroy.service';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(
    private snackbar: MatSnackBar,
    private translateService: TranslateService
  ) {
    super();
  }

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
      this.snackbar.open(this.translateService.instant('ERRORS.PLEASE_SELECT_OPTION_FROM_LIST'), this.translateService.instant('CLOSE'), {
        panelClass: 'refresh-snackbar',
        verticalPosition: 'top',
        duration: 3000
      });
    }
  }
}
