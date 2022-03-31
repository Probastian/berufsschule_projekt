import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { Label } from '../models/label';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = "api/post/"

  constructor(private http:HttpClient) { }


  // Wenn kein user angemeldet ist der default feed für home
  public loadDefaultFeed():Promise<Post[]> {
    const requestUrl = `${this.baseUrl}default`;

    return this.http.get<{success:boolean, data:any[]}>(requestUrl).pipe(
      map(response => {
        if (!response.success) return [];

        return response.data.map(post => {
          return new Post(post.id, post.user_id, post.topic_ic, post.name, post.content, post.commentCount, new Date(post.creation_date))
        })
      })
    ).toPromise()
  }

  public loadSubscriptionFeed() {
    const requestUrl = `${this.baseUrl}subs`;
    const requestBody = {
      token: localStorage.getItem("token")
    }

    return this.http.post<{success:boolean, data:any[]}>(requestUrl, requestBody).pipe(
      map(response => {
        if (!response.success) return [];

        return response.data.map(post => {
          return new Post(post.id, post.user_id, post.topicId, post.name, post.content, post.commentCount, new Date(post.creationDate));
        });
      })
    ).toPromise();
  }

  public async loadPostsByTopic(id:number):Promise<Post[]> {
    const requestUrl = `${this.baseUrl}topic/${id}`;

    return this.http.get<{success:boolean, data:any[]}>(requestUrl).pipe(
      map(response => {
        if (!response.success) return [];

        return response.data.map(post => {
          return new Post(post.id, post.user_id, post.topicId, post.name, post.content, post.commentCount, new Date(post.creationDate));
        });
      })
    ).toPromise()
  }

  public async loadPostById(id:number):Promise<Post|undefined> {
    const requestUrl = `${this.baseUrl}id/${id}`;

    return this.http.get<{success:boolean, data:any}>(requestUrl).pipe(
      map(response => {
        if (!response.success) return undefined;

        const data = response.data;
        return new Post(data.id, data.user_id, data.topic_id, data.name, data.content, 0, new Date(data.creation_date));
      })
    ).toPromise();
  }

  public async createPost(tid:number, uid:number, values:any):Promise<Post|undefined> {
    const requestUrl = `${this.baseUrl}create`;
    const requestBody = {
      token: localStorage.getItem('token'),
      tid: tid,
      name: values.header,
      content: values.description
    }

    return this.http.post<{success:boolean, pid:number}>(requestUrl, requestBody).pipe(
      map(response => {
        if (!response.success) return undefined;

        const pid = response.pid;
        for (let lid of values.labels) {
          this.addLabel(parseInt(lid), pid).then(() => {});
        }

        return new Post(pid, uid, tid, values.header, values.description, 0, new Date());
      })
    ).toPromise()
  }

  public async deletePost() {

  }

  public async loadComments(pid:number):Promise<Comment[]> {
    const requestUrl = `${this.baseUrl}comment/id/${pid}`;

    return this.http.get<{success:boolean, data:any[]}>(requestUrl).pipe(
      map(response => {
        if (!response.success) return [];

        return response.data.map(comment => {
          return new Comment(comment.id, comment.user_id, comment.text, new Date(comment.creation_date));
        });
      })
    ).toPromise()
  }

  public async deleteComment(cid:number):Promise<boolean> {
    const requestUrl = `${this.baseUrl}comment/delete`;
    const requestBody = {
      token: localStorage.getItem('token'),
      cid: cid
    }

    return this.http.post<{success:boolean}>(requestUrl, requestBody).pipe(
      map(response => {
        if (response) {
          return response.success;
        }
        return false;
      })
    ).toPromise();
  }

  public async postComment(pid:number, uid:number, text:string) {
    const requestUrl = `${this.baseUrl}comment/create`;
    const requestBody = {
      token: localStorage.getItem('token'),
      pid: pid,
      uid: uid,
	    text: text
    }
    console.log(requestBody);

    return this.http.post<{success:boolean, cid:number}>(requestUrl, requestBody).pipe(
      map(response => {
        console.log(response)
        if (!response.success) return undefined;
        return new Comment(response.cid, uid, text, new Date());
      })
    ).toPromise()
  }

  /*
    Label functions
  */

  public async loadLabels() {
    const requestUrl = `${this.baseUrl}labels`

    return this.http.get<{success:boolean, data:Label[]}>(requestUrl).pipe(
      map(response => {
        if (!response.success) return [];

        return response.data;
      })
    ).toPromise();
  }

  public async loadLabelForPost(id:number):Promise<Label[]> {
    const requestUrl = `${this.baseUrl}label/${id}`;

    return this.http.get<{success:boolean, data:Label[]}>(requestUrl).pipe(
      map(response => {
        if (!response.success) return [];
        return response.data;
      })
    ).toPromise();
  }

  public async addLabel(id:number, pid:number):Promise<boolean> {
    const requestUrl = `${this.baseUrl}label/add`;
    const requestBody = {
      token: localStorage.getItem('token'),
      pid: pid,
      lid: id
    }

    return this.http.post<{success:boolean}>(requestUrl, requestBody).pipe(
      map(response => {
        return response.success
      })
    ).toPromise();
  }
}
