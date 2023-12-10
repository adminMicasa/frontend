import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu (click)="clickMenu()" [items]="menu"></nb-menu>
      <router-outlet ></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS.filter(menu => menu?.data?.active == true);

  constructor(private sidebarService: NbSidebarService) { }

  clickMenu() {
    this.sidebarService.toggle(true, 'menu-sidebar');

  }
}
