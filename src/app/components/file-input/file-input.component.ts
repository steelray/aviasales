import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CustomFormFieldComponent } from '../custom-form-field/custom-form-field.component';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileInputComponent extends CustomFormFieldComponent {
  files: File[];

  onFileChange(event: InputEvent): void {
    const target = event.target as any;

    this.files = target.files;

    this.control.setValue(this.files);
  }
}
