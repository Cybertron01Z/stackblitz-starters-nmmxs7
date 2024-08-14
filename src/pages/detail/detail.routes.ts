import { MycssRoute } from "../../models/global.model";
import { DetailAComponent } from "./detailA.component";
import { DetailBComponent } from "./detailB.component";
import { DetailCComponent } from "./detailC.component";

export const detailRoutes: MycssRoute[] = [
  {
    path: 'a',
    pathMatch: 'full',
    component: DetailAComponent,
    data: { flowSourcePage: true }
  },
  {
    path: 'b',
    pathMatch: 'full',
    component: DetailBComponent
  },
  {
    path: 'c',
    pathMatch: 'full',
    component: DetailCComponent
  },
]
