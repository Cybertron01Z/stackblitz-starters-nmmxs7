import { Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-hub-a',
  template: `
    <h1>Login Redirect</h1>`,
  standalone: true,
})
export class LoginRedirectComponent implements OnInit {
  private router = inject(Router);

  ngOnInit() {
    this.router.navigate(['hub'], { replaceUrl: true })
  }
}
