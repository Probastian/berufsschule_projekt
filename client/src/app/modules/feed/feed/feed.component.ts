import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass']
})
export class FeedComponent implements OnInit {
  private _posts:Post[] = [];
  private _currentUser:User|undefined;

  constructor(private postService:PostService, private userService:UserService) {
    this._currentUser = this.userService.getCurrentUser();  
  }

  async ngOnInit() {
    this._posts = await this.postService.loadSubscriptionFeed();
  }

  public get posts():Post[] {
    return this._posts
  }

  public displayWelcomeBack():boolean {
    console.log(this._currentUser)
    if (this._currentUser === null || this._currentUser === undefined) {
      return true;
    } 
    return false;
  }

  public get username():string|undefined {
    return this._currentUser?.username;
  }
}
