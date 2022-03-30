import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.sass']
})
export class TopicsComponent implements OnInit {
  public topicsMap:Map<string, string[]>;
  public topicsMapKeys:Array<string>;

  constructor() {
    this.topicsMap = new Map([
      ["t", ["test1", "test2"]],
      ["u", ["uzo"]]
    ])
    this.topicsMapKeys = Array.from(this.topicsMap.keys());
  }

  getType(obj:any) {
    return typeof obj as string;
  }

  ngOnInit(): void {
  }

}
