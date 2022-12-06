import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

/// <see cref="https://stackoverflow.com/a/63411260"/>
@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent {
  options = [
    { id: '1', title: "Last 7 days", disabled: false },
    { id: '2', title: "Last 30 days", disabled: false },
    { id: '3', title: "Last 60 days", disabled: false }
  ];

  disableAll(ev: MatSlideToggleChange): void {
    if (ev.checked)
      this.options
        .filter(opt => opt.id != ev.source._elementRef.nativeElement.id)
        .forEach(opt => opt.disabled = true);
    else
      this.options.forEach(opt => opt.disabled = false);
  }
}
