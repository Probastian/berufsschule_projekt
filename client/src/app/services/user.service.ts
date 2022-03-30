import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "api/user/"

  constructor(private http:HttpClient) { }

  public getCurrentUser():User {
    return JSON.parse(localStorage.getItem('user') as string);
  }

  public async performLogin(username:string, password:string) {
    const requestUrl = `${this.baseUrl}login`;
    const requestBody = {
      login: username,
      password: password
    }

    const response = await this.http.post<any>(requestUrl, requestBody).toPromise();
    return new Promise<boolean>((resolve) => {
      if (response.success || response.user) {
        const userRes = response.user;
        const user = new User(userRes.id, userRes.username, userRes.email, userRes.firstname, userRes.lastname, userRes.join_date, userRes.role === 1);
        
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", response.token);

        resolve(true);
      } else { 
        resolve(false);
      }
    });
  }

  public async performSignup(values:any) {
    const requestUrl = `${this.baseUrl}create`
    const requestBody = {
      username: values.username,
      firstname: values.firstname,
      lastname: values.surname,
      email: values.mail,
      password: values.password
    }

    const response = await this.http.post<any>(requestUrl, requestBody).toPromise();

    return new Promise<boolean>( async (resolve) => {
      if (response.success) {
        const loginSuccessful = await this.performLogin(values.username, values.password);

        if (loginSuccessful) {
          resolve(true);
        }
        resolve(false);
      }
    });
  }
}
