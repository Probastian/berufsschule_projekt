import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Topic } from 'src/app/models/topic';
import { User } from 'src/app/models/user';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.sass']
})
export class TopicsComponent implements OnInit {
  public topicsMap:Map<string, Topic[]> = new Map();
  public topicsMapKeys:Array<string> = [];
 
  private _currentUser:User|undefined;


  constructor(private topicService:TopicService, private userService:UserService) { }

  ngOnInit(){
    this.topicService.loadAllTopics()
      .then(topics => { 
        this.mapTopics(topics);
      });
  }

  public get currentUser():User|undefined {
    return this._currentUser;
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

  public async createTopic(form:NgForm) {
    if (form.valid) {
      const values = form.value;
      const newTopic = await this.topicService.createTopic(values.name, values.description);
      if (newTopic !== undefined) {
        const firstChar = newTopic.name.charAt(0)
        const previous = this.topicsMap.get(firstChar)
        if (previous) {
          previous.push(newTopic)
        } else {
          this.topicsMap.set(firstChar, [newTopic]);
        }
        this.topicsMapKeys = Array.from(this.topicsMap.keys());
      }
    }
  }
}
