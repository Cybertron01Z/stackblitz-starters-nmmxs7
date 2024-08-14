import { MycssRoute } from "../../models/global.model";
import { HubAComponent } from "./hubA.component";
import { HubBComponent } from "./hubB.component";

export const hubRoutes: MycssRoute[] = [
  {
    path: '',
    pathMatch: 'full',
    component: HubAComponent,
    data: {
      flowSourcePage: true,
      hubPage: true
    }
  },
  {
    path: 'b',
    pathMatch: 'full',
    component: HubBComponent,
    data: {
      hubPage: true
    }
  }
  ]
