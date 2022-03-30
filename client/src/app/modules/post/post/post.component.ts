import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {
  public labelsList:Array<string>;

  constructor() {
    this.labelsList = Array.from(this.getLabels())
  }

  ngOnInit(): void {
  }

  getLabels():Array<string> {
    return [
      "label1",
      "test",
      "kack"
    ]
  }

  log(obj:any):any {
    console.log(typeof obj)
    console.log(obj)
    return obj
  }
}
