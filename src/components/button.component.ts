import { Component, output } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button (click)="clicked.emit()"
            class="py-2.5 px-5 me-2 mb-2 bg-blue-800 text-sm font-medium text-white hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 rounded-lg border border-gray-200 focus:z-10">
      <ng-content/>
    </button>`,
  standalone: true
})

export class AppButtonComponent {
  clicked = output<void>();
}
