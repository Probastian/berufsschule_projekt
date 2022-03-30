import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Topic } from '../models/topic';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private baseUrl = "api/topic/"

  constructor(private http:HttpClient, private userService:UserService) { }

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

  public loadById(id:number):Promise<Topic|undefined> {
    const requestUrl = `${this.baseUrl}id/${id}`;

    return this.http.get<{success:boolean, data: any}>(requestUrl).pipe(
      map(response => {
        if (!response.success) return undefined;

        const data = response.data;
        return new Topic(data.id, data.name, data.description, data.creator);  
      })
    ).toPromise()
  }
}
