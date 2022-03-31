import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { Topic } from 'src/app/models/topic';
import { Comment } from 'src/app/models/comment';
import { PostService } from 'src/app/services/post.service';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

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
  private _currentUser:User|undefined;

  public labelsList:Array<string>;

  constructor(private postService:PostService, private topicService:TopicService, private userService:UserService, private route:ActivatedRoute) {
    this.route.params.subscribe(params => this.id = parseInt(params.id));
    this._currentUser = this.userService.getCurrentUser()

    this.labelsList = Array.from(this.getLabels())
  }

  async ngOnInit():Promise<void> {
    const post = await this.postService.loadPostById(this.id);

    if(post !== undefined) {
      this._post = post;
      this._topic = await this.topicService.loadById(post.topicId);
      this._comments = await this.postService.loadComments(post.id);
    }
  }

  public get post():Post|undefined {
    return this._post;
  }

  public get topic():Topic|undefined {
    return this._topic;
  }

  public get comments():Comment[] {
    return this._comments;
  }

  public getUsernameById(id:number|undefined) {
    if (id === undefined) return "not available";
    const user = this.userService.getUserById(id);
    if (user !== undefined) {
      return user.username;
    } 
    return "not available";
  }

  public hasPermission(element_uid:number|undefined):boolean {
    const user = this._currentUser;
    console.log(user)
    if (user === null || user === undefined || element_uid === undefined) return true;

    return (user.id === element_uid || user.isAdmin);
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
