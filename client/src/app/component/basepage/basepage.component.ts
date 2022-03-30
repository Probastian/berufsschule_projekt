import { Component, OnInit } from '@angular/core';
import * as fa from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'basepage-component',
  templateUrl: './basepage.component.html',
  styleUrls: ['./basepage.component.sass']
})
export class BasepageComponent implements OnInit {
  // FontAwesome Icons (Gallery: https://fontawesome.com/icons?d=gallery&s=solid%2Cbrands&m=free)
  fa = fa;

  constructor() { }

  ngOnInit(): void {
  }

  public scrollToTop():void {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Oper
  }
}
