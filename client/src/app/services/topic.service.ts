import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Topic } from '../models/topic';
import { User } from '../models/user';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private baseUrl = "api/topic/"
  private currentUser:User|undefined;

  constructor(private http:HttpClient, private userService:UserService) {
    this.currentUser = userService.getCurrentUser();  
  }

  public loadAllTopics():Promise<Topic[]> {
    const requestUrl = `${this.baseUrl}all`;

    return this.http.get<{success:boolean, data: any[]}>(requestUrl).pipe(
      map(response => {
        console.log(response)
        if (!response.success) return [];
        
        return response.data.map(topic => {
          return new Topic(topic.id, topic.name, topic.description, topic.creator);
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

  public createTopic(name:string, description:string):Promise<Topic|undefined> {
    const requestUrl = `${this.baseUrl}create`;
    const requestBody = {
      token: localStorage.getItem("token"),
      userId: this.currentUser?.id,
      name: name, 
      description: description
    }

    return this.http.post<{success:boolean, tid:number}>(requestUrl, requestBody).pipe(
      map(response => {
        if (!response.success) return undefined;

        const uid = this.currentUser === undefined ? 0 : this.currentUser.id;
        return new Topic(response.tid, name, description, uid);
      })
    ).toPromise();
  }

  public deleteTopic(id:number):Promise<boolean> {
    const requestUrl = `${this.baseUrl}/`;
    const requestBody = {
      token: localStorage.getItem("token"),
      tid: id
    }

    return this.http.delete<{success:boolean}>(requestUrl, { body: requestBody } ).pipe(
      map(response => {
        return response.success;
      })
    ).toPromise();
  }
} 
