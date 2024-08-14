import { CanActivateChildFn } from '@angular/router';
import { inject } from '@angular/core';
import { NavigatorService } from "../services/navigator.service";

export const navigationGuard: CanActivateChildFn = (childRoute) => {
  const navigatorService = inject(NavigatorService);

  if (childRoute.component === null) {
    return true;
  }
  const data = childRoute.data;
  const target = navigatorService.getNavigationTarget();
  if (target) {
    const isTarget = navigatorService.isNavigationTarget(data);
    if (isTarget) {
      navigatorService.navigatedToTarget();
      return true;
    }
    navigatorService.navigateAfterSkipped();
    return false;
  }
  return true;
};
