import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { AppButtonComponent } from "../../components/button.component";
import { PageWrapperComponent } from "../../components/page-wrapper.component";
import { InfoBoxComponent } from "../../components/info-box.component";

@Component({
  selector: 'app-hub-b',
  template: `
    <app-page-wrapper title="Hub B">
      <app-info-box
          title="Detail Page"
          buttonLabel="Go to Detail Page"
          (clicked)="goToDetail()">
        <div class="flex flex-col gap-1.5">
          <p>This navigates to the <b>/detail/a</b> page.</p>
          <p>When clicking on the menu backdrop on the detail page, <b>navigateBackTo('hub-page')</b> is called. Which redirects back to this page <b>/hub/b</b>.</p>
        </div>
      </app-info-box>
    </app-page-wrapper>
  `,
  standalone: true,
  imports: [
    AppButtonComponent,
    PageWrapperComponent,
    InfoBoxComponent
  ]
})
export class HubBComponent {
  private router = inject(Router);

  goToDetail() {
    this.router.navigate(['detail', 'a'])
  }
}

