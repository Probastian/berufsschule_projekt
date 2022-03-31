import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = "api/post/"

  constructor(private http:HttpClient) { }


  // Wenn kein user angemeldet ist der default feed für home
  public loadDefaultFeed() {

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

  public async loadComments(pid:number):Promise<Comment[]> {
    const requestUrl = `${this.baseUrl}comment/id/${pid}`;
    console.log(requestUrl)

    return this.http.get<{success:boolean, data:any[]}>(requestUrl).pipe(
      map(response => {
        console.log(response)
        if (!response.success) return [];

        return response.data.map(comment => {
          return new Comment(comment.id, comment.user_id, comment.text, new Date(comment.creation_date));
        });
      })
    ).toPromise()
  }
}
