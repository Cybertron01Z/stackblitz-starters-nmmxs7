import { Component, input, output } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NgClass } from "@angular/common";
import { InfoBoxComponent } from "./info-box.component";

@Component({
  selector: 'app-menu-item',
  styles: `
      :host {
          display: list-item;
      }`,
  template: `
    <li>
      <a [routerLink]="href()" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200"
         routerLinkActive="bg-gray-200" [routerLinkActiveOptions]="{exact: true}">
        <ng-content/>
        <span class="ms-3">{{ title() }}</span>
      </a>
    </li>
  `,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  standalone: true
})
export class MenuItemComponent {
  href = input.required<string>();
  title = input.required<string>();
}

@Component({
  selector: 'app-menu',
  template: `
    @if (disableNavigation()) {
      <div class="fixed w-64 z-10 h-screen bg-black/50 flex flex-col-reverse">
        <app-info-box
            class="h-3/5"
            title="Back to Hub Page"
            buttonLabel="To Hub Page"
            (clicked)="backdropClick.emit()">
          <p>This calls <b>navigateBackTo('hub-page')</b>. It will skip any page, which is not marked as <b>hubPage</b>.</p>
        </app-info-box>
      </div>
    }
    <aside class="w-64 h-screen">
      <div class="h-full px-3 py-4 overflow-y-auto"
           [ngClass]="{'bg-gray-50': !disableNavigation(), 'bg-white': disableNavigation()}">
        <ul class="space-y-2 font-medium">
          <app-menu-item href="/hub" title="Hub Page A">
            <svg
                class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
              <path
                  d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
              <path
                  d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
            </svg>
          </app-menu-item>
          <app-menu-item href="/hub/b" title="Hub Page B">
            <svg
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
              <path
                  d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
            </svg>
          </app-menu-item>
        </ul>
      </div>
    </aside>
  `,
  imports: [
    MenuItemComponent,
    NgClass,
    InfoBoxComponent
  ],
  standalone: true
})
export class MenuComponent {
  disableNavigation = input.required<boolean>();

  backdropClick = output<void>();
}
