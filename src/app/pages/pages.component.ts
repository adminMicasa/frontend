import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu (mouseover)="expandMenu()" (mouseout)="compactMenu()" (click)="clickMenu(true)" [items]="menu"></nb-menu>
      <router-outlet ></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS.filter(menu => menu?.data?.active == true);

  constructor(private sidebarService: NbSidebarService) { }

  clickMenu(compact) {
    this.sidebarService.toggle(compact, 'menu-sidebar');
  }

  compactMenu(){
    this.sidebarService.compact('menu-sidebar');
  }

  expandMenu(){
    this.sidebarService.expand('menu-sidebar');
  }

}
