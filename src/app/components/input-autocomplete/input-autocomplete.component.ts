import { Component, ChangeDetectionStrategy, Input, ViewChild, ElementRef, AfterViewInit, Self } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomFormFieldComponent } from '@components/custom-form-field/custom-form-field.component';
import { ISelectOption } from '@core/interfaces/select-option.interface';
import { NgOnDestroy } from '@core/services/destroy.service';
import { TranslateService } from '@ngx-translate/core';
import { fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgOnDestroy]
})
export class InputAutocompleteComponent extends CustomFormFieldComponent implements AfterViewInit {
  @Input() options: ISelectOption[];
  optionIsSelected = false;
  @ViewChild('input') input: ElementRef;
  constructor(
    private snackbar: MatSnackBar,
    private translateService: TranslateService,
    @Self() private onDestroy$: NgOnDestroy
  ) {
    super();
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'blur').pipe(
      debounceTime(200),
      takeUntil(this.onDestroy$)
    ).subscribe(() => {
      if (this.control.value && typeof this.control.value === 'string') {
        this.control.setValue('');
        this.snackbar.open(this.translateService.instant('ERRORS.PLEASE_SELECT_OPTION_FROM_LIST'), this.translateService.instant('CLOSE'), {
          panelClass: 'refresh-snackbar',
          verticalPosition: 'top',
          duration: 3000
        });
      }
    });
  }

  displayWithFn(option: ISelectOption): string {
    return option.title;
  }

}
