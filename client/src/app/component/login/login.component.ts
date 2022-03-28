import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  public performLogin(form: NgForm) {
    if (form.valid) {
      const body = {
        login:form.value.username,
        password:form.value.password
      }
      console.log(body)
      this.http.post('/api/user/login', body)
        .subscribe(response => {
          console.log(response)
        })
    }
  }
}
