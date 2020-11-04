import { DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ISelectOption } from '@core/interfaces/select-option.interface';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  fromOptions$: Observable<string[]> = of(['usa', 'russia', 'china']);
  toOptions$: Observable<string[]> = of(['englend', 'germany', 'france']);
  passangersQuantityOptions: ISelectOption[] = [
    {
      value: 1,
      title: '1'
    },
    {
      value: 2,
      title: '2'
    },
  ];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  get controls(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const formValue = this.form.value;
    formValue.departure_date = this.transformDate(formValue.departure_date);
    formValue.arrival_date = this.transformDate(formValue.arrival_date);
    this.router.navigate(['/races'], { queryParams: formValue });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      departure: ['', RxwebValidators.required()],
      arrival: ['', RxwebValidators.required()],
      departure_date: ['', RxwebValidators.required()],
      arrival_date: ['', RxwebValidators.required()],
      passangers: ['', RxwebValidators.required()]
    });
  }

  private transformDate(date: any): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

}
