import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Topic } from '../models/topic';


@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private baseUrl = "api/topic/"

  constructor(private http:HttpClient) { }

  public loadAllTopics():Promise<Topic[]> {
    const requestUrl = `${this.baseUrl}all`;

    return this.http.get<{success:boolean, data: any[]}>(requestUrl).pipe(
      map(response => {
        console.log(response)
        if (!response.success) return [];
        
        return response.data.map(topic => {
          return new Topic(topic.id, topic.name, topic.desciption, topic.creator);
        });
      })
    ).toPromise()
  }
}
