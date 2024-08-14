import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { PageWrapperComponent } from "../../components/page-wrapper.component";
import { AppButtonComponent } from "../../components/button.component";
import { InfoBoxComponent } from "../../components/info-box.component";

@Component({
  selector: 'app-hub-a',
  template: `
    <app-page-wrapper title="Hub A">
      <app-info-box
          title="Start Flow"
          buttonLabel="Start Flow"
          (clicked)="startFlow()">
        <div class="flex flex-col gap-1.5">
          <p>This starts the flow via the <b>/flow/start</b> page, it automatically redirects to <b>/flow/b</b> with <b>&#123;
            replaceUrl: true &#125;</b>.</p>
          <b>All three requirements can be observed with this flow</b>
          <ol class="list-decimal list-inside">
            <li>
              When the flow is finished and <b>Back</b> is clicked, <b>back()</b> is called. Since the previous three
              pages are restricted <b>(flow-page-activation.guard)</b> it will redirect to this page <b>/hub/a</b>
            </li>
            <li>
              Within the flow, if <b>Cancel</b> is clicked, <b>navigateBackTo('flow-source-page')</b> is called.
              Which redirects back to this page <b>/hub/a</b>.
            </li>
            <li>
              If the backdrop of the grayed out menu is clicked <b>navigateTo('hub-page')</b> is called. Which
              redirects back to this page <b>/hub/a</b>
            </li>
          </ol>
          <i>When navigating back from a flow, the browser forward navigation is not possible anymore (this is done by
            design, since Chrome has some weird navigation issues)</i>
        </div>
      </app-info-box>
    </app-page-wrapper>
  `,
  standalone: true,
  imports: [
    PageWrapperComponent,
    AppButtonComponent,
    InfoBoxComponent
  ]
})
export class HubAComponent {
  private router = inject(Router);

  startFlow() {
    this.router.navigate(['flow', 'start'])
  }
}
