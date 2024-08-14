import { Component, input } from "@angular/core";
import { InfoBoxComponent } from "./info-box.component";

@Component({
  selector: 'app-page-wrapper',
  template: `
    <div class="m-20 mt-10">
      <h1 class="font-bold text-2xl mb-2">{{ title() }}</h1>
      <app-info-box title="Requirements" type="back">
        <ol class="list-decimal list-inside">
          <li>Skip Flows on back navigations</li>
          <li>Cancel Flows and navigate back to flow source page (where the flow was started from)</li>
          <li>On Detail pages, the menu is grayed out. When clicking on it, we should be navigated back to a page where
            the menu is active (hub pages)
          </li>
        </ol>
      </app-info-box>
      <ng-content/>
    </div>
  `,
  imports: [
    InfoBoxComponent
  ],
  standalone: true
})
export class PageWrapperComponent {
  title = input.required<string>()
}
