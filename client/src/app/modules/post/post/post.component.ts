import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { Topic } from 'src/app/models/topic';
import { PostService } from 'src/app/services/post.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {
  private id:number = -1;
  private _post:Post|undefined;
  private _topic:Topic|undefined;
  private _comments:Comment[] = [];

  public labelsList:Array<string>;

  constructor(private postService:PostService, private topicService:TopicService, private route:ActivatedRoute) {
    this.route.params.subscribe(params => this.id = parseInt(params.id));

    this.postService.loadPostById(this.id).subscribe(post => this._post = post );

    this.labelsList = Array.from(this.getLabels())
  }

  async ngOnInit():Promise<void> {
    console.log(this._post)
    if(this._post !== undefined) {
      this._topic = await this.topicService.loadById(this._post.topicId);
      console.log(this._topic)
      this._comments = [];
    }
  }

  public get post():Post|undefined {
    return this._post;
  }

  public get topic():Topic|undefined {
    return this._topic;
  }

  getLabels():Array<string> {
    return [
      "label1",
      "test",
      "kack"
    ]
  }

  log(obj:any):any {
    // console.log(typeof obj)
    // console.log(obj)
    return obj
  }
}
