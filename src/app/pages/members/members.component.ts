import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-members',
  template: `
  <router-outlet></router-outlet>
`
})
export class MembersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
