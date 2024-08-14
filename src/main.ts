import { Component, computed, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  ActivatedRoute, NavigationEnd,
  provideRouter, Router, RouterLink,
  RouterOutlet,
  withRouterConfig
} from '@angular/router';
import { navigationGuard } from "./guards/navigation.guard";
import { LoginRedirectComponent } from "./pages/login-redirect.component";
import { MenuComponent } from "./components/menu.component";
import { toSignal } from "@angular/core/rxjs-interop";
import { filter, map, startWith } from "rxjs";
import { NavigatorService } from "./services/navigator.service";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="w-full h-dvh flex">
      <app-menu [disableNavigation]="disableNavigation()" (backdropClick)="toHubPage()"/>
      <div class="flex-1">
        <router-outlet/>
      </div>
    </div>
  `,
  imports: [
    RouterOutlet,
    RouterLink,
    MenuComponent
  ]
})
export class App {
  private router = inject(Router);
  private navigatorService = inject(NavigatorService);

  disableNavigation = toSignal(this.router.events.pipe(
    filter((e) => e instanceof NavigationEnd),
    map(() => !location.href.includes('hub'))
  ), { initialValue: false })

  toHubPage() {
    this.navigatorService.navigateTo('hub-page');
  }
}

bootstrapApplication(App, {
  providers: [
    provideRouter([{
      path: '',
      canActivateChild: [navigationGuard],
      children: [
        {
          path: '',
          redirectTo: 'login-redirect',
          pathMatch: 'full'
        },
        {
          path: 'hub',
          loadChildren: () => import('./pages/hub/hub.routes').then((m) => m.hubRoutes)
        },
        {
          path: 'flow',
          loadChildren: () => import('./pages/flow/flow.routes').then((m) => m.flowRoutes)
        },
        {
          path: 'detail',
          loadChildren: () => import('./pages/detail/detail.routes').then((m) => m.detailRoutes)
        },
        {
          path: 'login-redirect',
          component: LoginRedirectComponent
        },
        {
          path: '**',
          redirectTo: 'hub'
        }
      ]
    }], withRouterConfig({ canceledNavigationResolution: 'computed' }))
  ]
});
