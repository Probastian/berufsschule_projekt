import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Label } from '../models/label';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  private baseUrl = "api/label/"

  constructor(private http:HttpClient) { }

  public async createLabel(name:string):Promise<Label|undefined> {
    const requestUrl = this.baseUrl;
    const requestBody = {
      token: localStorage.getItem('token'),
      name: name
    }
    
    return this.http.post<{success:boolean, lid:number}>(requestUrl, requestBody).pipe(
      map(response => {
        if (!response.success) return undefined;
        const lid = response.lid;
        return new Label(lid, name);
      })
    ).toPromise()
  }

  public async deleteLabel(id:number):Promise<boolean|undefined> {
    const requestUrl = `${this.baseUrl}${id}`;
    const requestBody = {
      token: localStorage.getItem('token'),
    }
    
    return this.http.delete<{success:boolean, lid:number}>(requestUrl, {
      body: requestBody
    }).pipe(
      map(response => {
        return response.success
      })
    ).toPromise()
  }
}
