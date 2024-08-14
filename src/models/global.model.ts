import { Route } from "@angular/router";

export type NavigationTarget = 'hub-page' | 'flow-source-page' | 'non-back-skip-page';

export interface RouteData {
  flowSourcePage?: boolean;
  hubPage?: boolean;
  flowBasePath?: string;
  backSkip?: boolean;

}

export interface MycssRoute extends Route {
  data?: RouteData;
  children?: MycssRoute[];
}
