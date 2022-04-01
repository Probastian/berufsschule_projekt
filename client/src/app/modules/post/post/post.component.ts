import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { Topic } from 'src/app/models/topic';
import { Comment } from 'src/app/models/comment';
import { PostService } from 'src/app/services/post.service';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';
import { Label } from 'src/app/models/label';

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
  private _labels:Label[] = [];

  constructor(private postService:PostService, private topicService:TopicService, private userService:UserService, private route:ActivatedRoute, private router:Router) {
    this.route.params.subscribe(params => this.id = parseInt(params.id));
    this._currentUser = this.userService.getCurrentUser();

    this.postService.loadLabels().then(labels => {
      this._labels = labels;
    });
  }

  async ngOnInit():Promise<void> {
    const post = await this.postService.loadPostById(this.id);

    if(post !== undefined) {
      this._post = post;
      this._topic = await this.topicService.loadById(post.topicId);
      this._comments = await this.postService.loadComments(post.id);
      this._labels = await this.postService.loadLabelForPost(post.id);
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

  public get labels():Label[] {
    return this._labels;
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
    if (user === null || user === undefined || element_uid === undefined) return true;

    return (user.id === element_uid || user.isAdmin);
  } 

  public createComment(form:NgForm) {
    if (form.valid) {
      const user = this._currentUser;
      const post = this.post;
      
      if (user && post) {
        this.postService.postComment(post.id, user.id, form.value.comment).then(comment => {
          if (comment) {
            this._comments = [comment].concat(this.comments);
          }
        });
      }
    }
  }

  public deleteComment(comment:Comment):void {
    this.postService.deleteComment(comment.id)
      .then(success => {
        console.log(success)
        if (success) {
          this.comments.splice(this.comments.indexOf(comment), 1);
        }
      });
  }

  public async deletePost():Promise<void> {
    if (this.post) {
      this.labels.forEach(label => {
        this.postService.removeLabel(label.id, this.post?.id ? this.post.id : -1);
      });
      
      this.comments.forEach(comment => {
        this.deleteComment(comment);
      });

      const response = await this.postService.deletePost(this.post.id)
      if (response) {
        this.router.navigate(["/posts"]);
      } else {
        alert("An error occured while deleting this post.")
      }
    } else {
      alert("An error occured while deleting this post.")
    }
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
