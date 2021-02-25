import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ``
})
export class RaceFilterChecboxesGroupComponent {

  onChange(event: MatCheckboxChange, control: FormControl): void {
    let res = [...control.value] || [];
    if (event.checked) {
      res.push(event.source.value);
    } else {
      res = res.filter(val => val !== event.source.value);
    }
    control.setValue(res);
  }

}
