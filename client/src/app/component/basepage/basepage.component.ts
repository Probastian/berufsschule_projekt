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

}
