import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.sass']
})
export class TopicsComponent implements OnInit {
  public topicsMap:Map<string, Topic[]> = new Map();
  public topicsMapKeys:Array<string> = [];

  constructor(private topicService:TopicService) {
    
    // this.topicsMap = new Map([
    //   ["t", ["test1", "test2"]],
    //   ["u", ["uzo"]]
    // ])
    // this.topicsMapKeys = Array.from(this.topicsMap.keys());
  }

  ngOnInit(){
    this.topicService.loadAllTopics()
      .then(topics => { 
        console.log(topics)
        this.mapTopics(topics);
      });
  }

  private mapTopics(topics:Topic[]):void {
    const topicsMap:Map<string, Topic[]> = new Map();

    for (let topic of topics) {
      const firstChar = topic.name.charAt(0)?.toUpperCase();
    
      if (topicsMap.get(firstChar)) {
        topicsMap.get(firstChar)?.push(topic)
      } else {
        topicsMap.set(firstChar, [topic])
      }
    }

    this.topicsMap = topicsMap;
    this.topicsMapKeys = Array.from(topicsMap.keys());
  }

  getType(obj:any) {
    return typeof obj as string;
  }
}
