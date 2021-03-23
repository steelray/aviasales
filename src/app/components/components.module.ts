import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { InputComponent } from './input/input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { CustomFormFieldComponent } from './custom-form-field/custom-form-field.component';
import { TextareaComponent } from './textarea/textarea.component';
import { SelectComponent } from './select/select.component';
import { MatSelectModule } from '@angular/material/select';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FileInputComponent } from './file-input/file-input.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MaterialIconCustomizeModule } from '@core/material-icon-customize.module';
import { InputAutocompleteComponent } from './input-autocomplete/input-autocomplete.component';
import { CountInputComponent } from './count-input/count-input.component';
import { getLangFromParams } from '@core/utils/get-lang.util';


const COMPONENTS = [
  InputComponent,
  CustomFormFieldComponent,
  TextareaComponent,
  SelectComponent,
  DatepickerComponent,
  FileInputComponent,
  PageNotFoundComponent,
  InputAutocompleteComponent,
  CountInputComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatRippleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MaterialIconCustomizeModule,
    MatAutocompleteModule
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: getLangFromParams(),
      multi: true
    }
  ],
  exports: COMPONENTS,
  entryComponents: [
  ]
})
export class ComponentsModule { }
