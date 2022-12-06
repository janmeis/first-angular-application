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
    { id: '1', title: "Last 7 days", checked: false },
    { id: '2', title: "Last 30 days", checked: false },
    { id: '3', title: "Last 60 days", checked: false }
  ];

  onChange(ev: MatSlideToggleChange): void {
    this.options.forEach(opt => opt.checked = opt.id == ev.source._elementRef.nativeElement.id && ev.checked);
  }
}
