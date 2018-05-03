import { Component } from '@angular/core';

@Component({
    selector: 'carbon-loading',
    template: `
<div class="bx--loading-overlay">
  <div data-loading class="bx--loading">
    <svg class="bx--loading__svg" viewBox="-75 -75 150 150"><circle cx="0" cy="0" r="37.5" /></svg>
  </div>
</div>`
})
export class LoadingComponent {
}
