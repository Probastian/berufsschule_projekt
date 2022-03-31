import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { Label } from 'src/app/models/label';
import { Topic } from 'src/app/models/topic';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { LabelService } from 'src/app/services/label.service';
import { TopicService } from 'src/app/services/topic.service';
import { NgSelectizeComponent } from 'ng-selectize';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.sass']
})
export class PostEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('labelsSelectize')
  public labelsSelectize: any | undefined;

  private id:number = -1;
  private _post:Post|undefined;
  private _topic:Topic|undefined;
  private _currentUser:User|undefined;
  private _allLabels:string[] = [];
  private _labels:Label[] = [];

  private _autocompleteConfig = {
    plugins: ['remove_button'],
    labelField: 'name',
    valueField: 'id',
    maxItems: 10,
    highlight: true,
    create: false,
    preload: true
  }

  constructor(private postService:PostService, private topicService:TopicService, private userService:UserService, private labelService:LabelService, private route:ActivatedRoute, private router:Router) {
    this.route.params.subscribe(params => this.id = parseInt(params.id));
    this._currentUser = this.userService.getCurrentUser();
    
    this.labelService.getAll().then(labels => {
      labels.forEach(label => {
        this._allLabels.push(label.name)
      });
    });

    if (this.hasPermission(this.id)) {
      router.navigate(['401']);
    }
  }

  async ngOnInit():Promise<void> {
    const post = await this.postService.loadPostById(this.id);
    if (post !== undefined) {
      this._post = post;
      this._topic = await this.topicService.loadById(post.topicId);
      this._labels = await this.postService.loadLabelForPost(post.id);
    }
  }

  async ngAfterViewInit():Promise<void> {
    await new Promise(r => setTimeout(r, 2000));
    // await this.labelsAsObjects();
    console.log(this.labels)
  }

  public get post():Post|undefined {
    return this._post;
  }

  public get topic():Topic|undefined {
    return this._topic;
  }

  public get labels():Label[] {
    return this._labels;
  }
  
  public get allLabels():string[] {
    console.log(this._allLabels)
    return this._allLabels;
  }

  public get autocompleteConfig():any {
    return this._autocompleteConfig;
  }

  public hasPermission(element_uid:number|undefined):boolean {
    const user = this._currentUser;
    if (user === null || user === undefined || element_uid === undefined) return true;

    return (user.id === element_uid || user.isAdmin);
  }

  public getUsernameById(id:number|undefined) {
    if (id === undefined) return "not available";
    const user = this.userService.getUserById(id);
    if (user !== undefined) {
      return user.username;
    } 
    return "not available";
  }

  public editPost(form:NgForm) {
    console.log(form)
    console.log(form.valid)
    console.log(form.value)
    if (form.valid) {
      console.log("valid")
      const post = this.post;
      
      if (!form.value.name) {
        form.value.name = post?.name;
      }
      if (!form.value.description) {
        form.value.description = post?.content;
      }

      if (post) {
        console.log("post true")
        this.postService.editPost(post.id, form.value.name, form.value.description);
        this.router.navigate([`/post/${post.id}`]);
      }
    }
  }

  // public labelsAsObjects():void {
  //   let out:object[] = [];
  //   console.log(this.labelsSelectize);
  //   console.log(this.labels.length);
  //   if (!this.labelsSelectize) {
  //     console.log("ls empty")
  //     return
  //   }
  //   this.allLabels.forEach(label => {
  //     console.log("option:" + label.name);
  //     this.labelsSelectize.selectize.addOption(label.name);
  //   });
  //   this.labels.forEach(label => {
  //     console.log("item:" + label.name);
  //     this.labelsSelectize.selectize.addItem(label.name);
  //   });
  // }

  // public labelsAsStrings():string[] {
  //   let out:string[] = [];
  //   this.labels.forEach(label => {
  //     out.push(label.name)
  //   });
  //   return out;
  // }
}
