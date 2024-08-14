import { Component, input, output } from '@angular/core';
import { AppButtonComponent } from "./button.component";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-info-box',
  template: `
    <div class="p-4 mb-4 border rounded-lg h-full"
         [ngClass]="{'text-blue-800 border-blue-300 bg-blue-50': type() === 'default', 'border-gray-300 bg-gray-50': type() === 'back'}">
      <div class="flex items-center">
        <svg class="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
             fill="currentColor" viewBox="0 0 20 20">
          <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <h3 class="text-lg font-medium">{{ title() }}</h3>
      </div>
      <div class="mt-2 mb-4 text-sm">
        <ng-content/>
      </div>
      @if (buttonLabel()) {
        <div class="flex">
          <app-button (clicked)="clicked.emit()">{{ buttonLabel() }}</app-button>
        </div>
      }
    </div>
  `,
  imports: [
    AppButtonComponent,
    NgClass
  ],
  standalone: true
})

export class InfoBoxComponent {
  title = input.required<string>();
  buttonLabel = input<string>();
  type = input<'default' | 'back'>('default');

  clicked = output<void>()
}
