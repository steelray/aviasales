import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CustomFormFieldComponent } from '../custom-form-field/custom-form-field.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent extends CustomFormFieldComponent {
  @Input() type: 'text' | 'number' | 'password' | 'email' | 'search' | 'file' = 'text';
  @Input() readonly: boolean;
}
