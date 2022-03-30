import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Topic } from 'src/app/models/topic';
import { User } from 'src/app/models/user';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.sass']
})
export class TopicComponent implements OnInit {
  private _topic:Topic|undefined;
  private _topicCreator:User|undefined;
  public availableLabels: string[];

  @ViewChild('autocomplete')
  public autocomplete: ElementRef | undefined;

  @ViewChild('label')
  public label: ElementRef | undefined;

  constructor(private topicService:TopicService, private userSerivce:UserService, private route:ActivatedRoute) {
    this.availableLabels = this.getAvailableLabels();
  }

  async ngOnInit() { 
    this.route.params.subscribe(params => {
      const topicId = parseInt(params.id);
      if (topicId) {
        this.topicService.loadById(topicId)
          .then(async topic => {
            if (topic !== undefined) {
              this._topic = topic;
              
              this._topicCreator = await this.userSerivce.getUserById(topic.id)
            }
          });
      }
    })
  }

  ngAfterViewInit(): void { }

  public get topic():Topic|undefined {
    return this._topic;
  }

  public get topicCreator():User|undefined {
    return this._topicCreator;
  }

  getAvailableLabels(): string[] {
    return [
      "label1",
      "label2",
      "test1",
      "kack"
    ];
  }

  addLabel(element: any): void {
    element = element.target;
    if (element.value == "") {
      return
    }
    if (!this.isLabelValid(element.value)) {
      alert("Not a valid label!")
      return
    }
    //<li class="labeltag" (click)="removeLabel($event)">Label</li>
    let newElem = document.createElement("li")
    newElem.classList.add("labeltag")
    newElem.classList.add("labeltag-interactive")
    newElem.innerHTML = element.value;
    element.parentElement.insertBefore(newElem, element);
    element.value = "";
  }

  removeLabel(element: any): void {
    element.target.remove();
  }

  isLabelValid(labelname: string): boolean {
    return this.availableLabels.includes(labelname);
  }

  @HostListener('click', ['$event']) onClick(event:any) {
    if (event.target.classList.contains("labeltag")) {
      this.removeLabel(event);
    }
  }
}
