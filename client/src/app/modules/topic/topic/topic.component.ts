import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { Topic } from 'src/app/models/topic';
import { User } from 'src/app/models/user';
import { PostService } from 'src/app/services/post.service';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.sass']
})
export class TopicComponent implements OnInit, AfterViewInit {
  private id:number = -1
  private _topic:Topic|undefined;
  private _topicCreator:User|undefined;
  private _posts:Post[] = [];

  public availableLabels: string[];

  @ViewChild('autocomplete')
  public autocomplete: ElementRef | undefined;

  @ViewChild('label')
  public label: ElementRef | undefined;

  constructor(private topicService:TopicService, private userSerivce:UserService,
              private postService:PostService, private route:ActivatedRoute) {
    this.route.params.subscribe(params => this.id = parseInt(params.id));
    this.availableLabels = this.getAvailableLabels();
  }

  async ngOnInit() {
    this._topic = await this.topicService.loadById(this.id);

    if (this.topic !== undefined) {
      this._topicCreator = await this.userSerivce.loadUserById(this.topic.creator)
      this._posts = await this.postService.loadPostsByTopic(this.topic.id);
    }
  }

  ngAfterViewInit(): void { }

  public get topic():Topic|undefined {
    return this._topic;
  }

  public get topicCreator():User|undefined {
    return this._topicCreator;
  }

  public get posts():Post[] {
    return this._posts;
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
