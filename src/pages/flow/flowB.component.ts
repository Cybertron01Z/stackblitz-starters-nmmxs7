import { Component, inject } from "@angular/core";
import { NavigatorService } from "../../services/navigator.service";
import { Router } from "@angular/router";
import { AppButtonComponent } from "../../components/button.component";
import { PageWrapperComponent } from "../../components/page-wrapper.component";
import { InfoBoxComponent } from "../../components/info-box.component";

@Component({
  selector: 'app-flow-b',
  template: `
    <app-page-wrapper title="Flow B">
      <app-info-box
          title="Back"
          buttonLabel="Back"
          (clicked)="back()">
        <p>This calls <b>back()</b>. This will navigate back to the previous page <b>(/hub/a or /detail/a)</b>.</p>
      </app-info-box>
      <app-info-box
          title="Cancel"
          buttonLabel="Cancel"
          (clicked)="cancel()">
        <p>This calls <b>navigateBackTo('flow-source-page')</b>. This will navigate back to the page marked as <b>&#123; flowSourcePage: true &#125; (/hub/a or /detail/a)</b>.</p>
      </app-info-box>
      <app-info-box
          title="Next"
          buttonLabel="Next"
          (clicked)="next()">
        <p>This will navigate to the next flow page <b>/flow/c</b></p>
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
export class FlowBComponent {
  private navigatorService = inject(NavigatorService);
  private router = inject(Router);

  back() {
    this.navigatorService.back();
  }

  cancel() {
    this.navigatorService.navigateTo('flow-source-page');
  }

  next() {
    this.router.navigate(['flow', 'c']);
  }
}

