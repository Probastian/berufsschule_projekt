import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'topbar-component',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.sass']
})
export class TopbarComponent implements OnInit {

  private _currentUser:User|undefined;

  constructor(private userService:UserService) {
    this._currentUser = userService.getCurrentUser();
  }

  ngOnInit(): void {
  }

  public get currentUser():User|undefined {
    return this._currentUser;
  }

  public performLogin(form:NgForm) {
    if (form.valid) {
      const values = form.value;

      this.userService.performLogin(values.username, values.password)
        .then(response => {
          if (response) {
            // modal schließen
          } else {
            // error loggen
          }
        });
    }
  }
}
