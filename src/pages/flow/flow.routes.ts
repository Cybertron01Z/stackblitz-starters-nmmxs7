import { MycssRoute } from "../../models/global.model";
import { FlowStartComponent } from "./flow-start.component";
import { FlowBComponent } from "./flowB.component";
import { FlowCComponent } from "./flowC.component";
import { flowPageActivationGuard } from "../../guards/flow-page-activation.guard";

export const flowRoutes: MycssRoute[] = [
  {
    path: 'start',
    pathMatch: 'full',
    component: FlowStartComponent
  },
  {
    path: 'b',
    pathMatch: 'full',
    component: FlowBComponent,
    canActivate: [flowPageActivationGuard],
    data: { flowBasePath: '/flow' }
  },
  {
    path: 'c',
    pathMatch: 'full',
    component: FlowCComponent,
    canActivate: [flowPageActivationGuard],
    data: { flowBasePath: '/flow' }
  }
]
