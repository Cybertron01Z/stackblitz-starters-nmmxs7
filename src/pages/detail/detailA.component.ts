import { Component, inject } from '@angular/core';
import { NavigatorService } from "../../services/navigator.service";
import { PageWrapperComponent } from "../../components/page-wrapper.component";
import { AppButtonComponent } from "../../components/button.component";
import { Router } from "@angular/router";
import { InfoBoxComponent } from "../../components/info-box.component";

@Component({
  selector: 'app-detail-a',
  template: `
    <app-page-wrapper title="Detail A">
      <app-info-box
          title="Back"
          buttonLabel="Back"
          (clicked)="back()">
        <p>This calls <b>back()</b>. This will navigate back to the previous hub page.</p>
      </app-info-box>
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
              pages are restricted <b>(flow-page-activation.guard)</b> it will redirect to this page <b>/detail/a</b>
            </li>
            <li>
              Within the flow, if <b>Cancel</b> is clicked, <b>navigateBackTo('flow-source-page')</b> is called.
              Which redirects back to this page <b>/detail/a</b>.
            </li>
            <li>
              If the backdrop of the grayed out menu is clicked <b>navigateTo('hub-page')</b> is called. Which
              redirects back to the previous hub page <b>/hub/b</b>
            </li>
          </ol>
          <i>When navigating back from a flow, the browser forward navigation is not possible anymore (this is done by
            design, since Chrome has some weird navigation issues)</i>
        </div>
      </app-info-box>
      <app-info-box
          title="Detail C"
          buttonLabel="Detail C"
          (clicked)="detailC()">
        <p>This will navigate to <b>/detail/c</b>.</p>
        <p>If you click then on the Detail A again on the next page and then on
          the backdrop, this will cause a special behavior. Where following code is used. See .... for more
          explanation</p>
        <pre>  
private setupListener() &#123;
  this.router.events.subscribe((e) => &#123;
    if (e instanceof NavigationSkipped) &#123;
      if (!this.navigationDirectionService.isSamePage() && this.navigationTarget) &#123;
        this.location.back();
      &#125;
    &#125;
  &#125;);
&#125;
</pre>
      </app-info-box>
    </app-page-wrapper>
  `,
  imports: [
    PageWrapperComponent,
    AppButtonComponent,
    InfoBoxComponent
  ],
  standalone: true
})
export class DetailAComponent {
  private navigatorService = inject(NavigatorService);
  private router = inject(Router);

  back() {
    this.navigatorService.back();
  }

  startFlow() {
    this.router.navigate(['flow', 'start'])
  }

  detailC() {
    this.router.navigate(['detail', 'c'])
  }
}
