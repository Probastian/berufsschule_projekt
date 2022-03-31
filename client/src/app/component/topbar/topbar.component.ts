import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'topbar-component',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.sass']
})
export class TopbarComponent implements OnInit {

  private _currentUser:User|undefined;

  constructor(private userService:UserService, private router:Router) {
    this._currentUser = userService.getCurrentUser();
  }

  ngOnInit(): void {
  }

  public displayLogin():boolean {
    if (this._currentUser === null || this._currentUser === undefined) {
      return true;
    } 
    return false;
  }

  public get currentUser():User|undefined {
    return this._currentUser;
  }

  public isAdmin():boolean {
    const user = this.currentUser;
    if (user === null || user === undefined) return false;
    return user.isAdmin;
  }

  public performLogin(form:NgForm) {
    if (form.valid) {
      const values = form.value;

      this.userService.performLogin(values.username, values.password)
        .then(response => {
          console.log(response)
          if (response) {
            // modal schließen
            window.location.reload();
          } else {
            // error loggen
          }
        });
    }
  }

  public performSignup(form:NgForm) {
    if (form.valid) {
      const values = form.value;

      if (values.password === values.repeat) {
        this.userService.performSignup(values)
        .then(response => {
          if (response) {
            // modal schließen
            window.location.reload();
          } else {
            // error loggen
          }
        });
      } else {
        // display error
      }
    }
  }

  public performLogout() {
    this.userService.performLogout();
    window.location.reload();
  }
}
