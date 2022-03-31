import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {

  private _currentUser:User|undefined;
  private _allUsers:User[] = [];
  private _userToDelete:User|undefined;

  constructor(private userService:UserService) { }

  async ngOnInit():Promise<void> {
    this._allUsers = await this.userService.loadAllUsers();
  }

  public get allUsers():User[] {
    return this._allUsers;
  }

  public get userToDelete():User|undefined {
    return this._userToDelete;
  }

  public set userToDelete(user:User|undefined) {
    this._userToDelete = user;
  }

  public async deleteUser() {
    const user = this.userToDelete;
    if (user) {
      const response = await this.userService.deleteUser(user.id);
      if (response) {
        this.allUsers.splice(this.allUsers.indexOf(user), 1);
      } else {
        alert("An error occured while deleting the user along all of its data.")
      }
    }
  }
}
