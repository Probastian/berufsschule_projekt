import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { map } from "rxjs/operators";


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

  }

  public loadPostsByTopic(id:number):Promise<Post[]> {
    const requestUrl = `${this.baseUrl}topic/${id}`;

    return this.http.get<{success:boolean, data:any[]}>(requestUrl).pipe(
      map(response => {
        if (!response.success) return [];

        return response.data.map(post => {
          return new Post(post.id, post.user_id, post.name, post.content, post.commentCount, new Date(post.creationDate));  
        });
      })
    ).toPromise()
  }
}
