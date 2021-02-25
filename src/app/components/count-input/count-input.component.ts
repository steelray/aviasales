import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-count-input',
  templateUrl: './count-input.component.html',
  styleUrls: ['./count-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountInputComponent implements OnInit {
  @Input() control = new FormControl();
  @Input() minValue = 0;
  @Input() maxDisable = false;


  ngOnInit(): void {
  }

  reduce(event: Event): void {
    event.stopPropagation();
    if (this.control.value === this.minValue) {
      return;
    }
    this.control.setValue(this.control.value - 1);
  }

  increase(event: Event): void {
    event.stopPropagation();
    if (this.maxDisable) {
      return;
    }
    this.control.setValue(this.control.value + 1);
  }

}
