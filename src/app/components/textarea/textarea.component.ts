import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { CustomFormFieldComponent } from '../custom-form-field/custom-form-field.component';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent extends CustomFormFieldComponent {
  @Input() rows = 6;
}
