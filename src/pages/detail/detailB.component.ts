import { Component, inject } from '@angular/core';
import { NavigatorService } from "../../services/navigator.service";
import { PageWrapperComponent } from "../../components/page-wrapper.component";
import { AppButtonComponent } from "../../components/button.component";
import { Router } from "@angular/router";
import { InfoBoxComponent } from "../../components/info-box.component";

@Component({
  selector: 'app-detail-b',
  template: `
    <app-page-wrapper title="Detail B">
      <app-info-box
          title="Back"
          buttonLabel="Back"
          (clicked)="back()">
        <p>This calls <b>back()</b>. Since there are restricted flow pages between <b>(flow-page-activation.guard)</b>, it will skip them and navigate back to the flow origin <b>(/hub/a or /detail/a)</b></p>
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
export class DetailBComponent {
  private navigatorService = inject(NavigatorService);

  back() {
    this.navigatorService.back();
  }

}
