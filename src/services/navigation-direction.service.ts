import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationDirectionService implements OnDestroy {
  private currentPageId = 0;
  private destroy = new Subject<void>();

  constructor(
    private readonly router: Router
  ) {
    this.setupListeners();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  getNavigationType(): 'back' | 'forward' | 'imperative' {
    const currentNavigation = this.router.getCurrentNavigation();
    if (!currentNavigation || currentNavigation.trigger === 'imperative') {
      return 'imperative';
    }
    if (this.currentPageId > this.getRouterPageId()) {
      return 'back';
    } else {
      return 'forward';
    }
  }

  isSamePage() {
    return this.getRouterPageId() === this.currentPageId;
  }

  private getRouterPageId(): number {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return (window.history.state?.ɵrouterPageId as number) ?? 0;
  }

  private setupListeners() {
    this.router.events.pipe(takeUntil(this.destroy)).subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.currentPageId = this.getRouterPageId();
      }
    });
  }
}
