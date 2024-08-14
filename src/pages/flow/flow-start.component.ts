import { Component, inject, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-flow-a',
  template: `<h1>FlowA should never be seen</h1>`,
  standalone: true
})
export class FlowStartComponent implements OnInit {
  private router = inject(Router);

  ngOnInit(): void {
    this.router.navigate(['flow', 'b'], { replaceUrl: true });
  }
}
