import { Component, inject } from '@angular/core';
import { NavigatorService } from "../../services/navigator.service";
import { PageWrapperComponent } from "../../components/page-wrapper.component";
import { AppButtonComponent } from "../../components/button.component";
import { Router } from "@angular/router";
import { InfoBoxComponent } from "../../components/info-box.component";

@Component({
  selector: 'app-detail-c',
  template: `
    <app-page-wrapper title="Detail C">
      <app-info-box
          title="Back"
          buttonLabel="Back"
          (clicked)="back()">
        <p>This calls <b>back()</b>. This will navigate back to <b>/detail/a</b></p>
      </app-info-box>
      <app-info-box
          title="Detail A"
          buttonLabel="Detail A"
          (clicked)="detailA()">
        <p>This will navigate to <b>/detail/a</b>.</p>
        <p>If you click then on the Detail C again on the next page and then on
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
export class DetailCComponent {
  private navigatorService = inject(NavigatorService);
  private router = inject(Router);

  back() {
    this.navigatorService.back();
  }

  detailA() {
    this.router.navigate(['detail', 'a'])
  }
}
