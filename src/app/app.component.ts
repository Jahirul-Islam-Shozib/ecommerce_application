import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./layout/navbar/navbar.component";
import {FooterComponent} from "./workspace/footer/footer.component";
import {Toast} from "primeng/toast";
import {MessageService} from "primeng/api";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, Toast, NgClass],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecom_project';


  isAuthPage = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAuthPage =
          event.url.includes('/auth/login') ||
          event.url.includes('/auth/register') ||
          event.url.includes('/auth/set-password');
      }
    });
  }
}
