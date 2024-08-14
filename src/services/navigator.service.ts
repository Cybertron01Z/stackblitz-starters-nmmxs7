import { Injectable } from "@angular/core";
import { NavigationTarget, RouteData } from "../models/global.model";
import { Data, NavigationSkipped, Router } from "@angular/router";
import { NavigationDirectionService } from "./navigation-direction.service";
import { Location } from "@angular/common";
import { filter, take } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {
  private navigationTarget?: NavigationTarget;
  private skip = -1;

  constructor(
    private readonly location: Location,
    private readonly router: Router,
    private readonly navigationDirectionService: NavigationDirectionService,
  ) {
    this.setupListener();
  }

  back(): void {
    this.skip = -1;
    this.location.back();
  }

  // this is called from pages, where no navigation is in progress
  navigateTo(target: NavigationTarget) {
    this.skip = -1;
    this.navigationTarget = target;
    this.location.back();
  }

  // this has to be called from guards, which returns false and then want to navigate back (currently a navigation is in progress)
  navigateToTargetAfterSkipped(target: NavigationTarget) {
    this.navigationTarget = target;
    this.navigateAfterSkipped();
  }

  getNavigationTarget(): NavigationTarget | undefined {
    return this.navigationTarget;
  }

  isNavigationTarget(routeData: Data) {
    if (this.navigationTarget === 'flow-source-page') {
      return (routeData as RouteData).flowSourcePage ?? false;
    }
    if (this.navigationTarget === 'hub-page') {
      return (routeData as RouteData).hubPage ?? false;
    }
    throw new Error('this should never be called, when the navigationTarget is undefined');
  }

  navigatedToTarget() {
    this.skip = -1;
    this.navigationTarget = undefined;
  }

  navigateAfterSkipped() {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationSkipped),
        take(1)
      )
      .subscribe(() => {
        this.skip -= 1;
        this.location.historyGo(this.skip);
      });
  }

  private setupListener() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationSkipped) {
        if (!this.navigationDirectionService.isSamePage() && this.navigationTarget) {
          this.location.back();
        }
      }
    });
  }
}
