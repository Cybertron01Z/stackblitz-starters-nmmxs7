import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NavigatorService } from "../services/navigator.service";
import { NavigationDirectionService } from "../services/navigation-direction.service";

export const flowPageActivationGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const navigatorService = inject(NavigatorService);
  const navigationDirectionService = inject(NavigationDirectionService);

  // the shared part of the flow path (e.g., /insurance/accident-coverage-mutation/form -> accident-coverage-mutation) -> must be provided via route data -> see *.routes.ts
  const flowBasePath = route.data['flowBasePath'] as string;
  if (!flowBasePath) {
    throw new Error("'flowBasePath' is not defined but must be provided via routes!");
  }

  // the path from which the navigation to this route originated
  const originUrl = router.routerState.snapshot.url;

  // the navigation from/to flow pages is only allowed from another flow page
  const isFlowPageActivationAllowed = originUrl.includes(flowBasePath);
  // if a navigation request outside a flow targets a flow page, we navigate to the latest flowSourcePage, instead of the requested page
  if (!isFlowPageActivationAllowed && navigationDirectionService.getNavigationType() !== 'forward') {
    navigatorService.navigateToTargetAfterSkipped('flow-source-page');
    return false;
  }

  return isFlowPageActivationAllowed;
};
