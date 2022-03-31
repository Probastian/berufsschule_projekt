import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Label } from 'src/app/models/label';
import { User } from 'src/app/models/user';
import { LabelService } from 'src/app/services/label.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.sass']
})
export class LabelsComponent implements OnInit {
  public labelsMap:Map<string, Label[]> = new Map();
  public labelsMapKeys:Array<string> = [];
  
  private _currentUser:User|undefined;

  constructor(private labelService:LabelService, userService:UserService) { 
    this._currentUser = userService.getCurrentUser();
  }

  public get currentUser():User|undefined {
    return this._currentUser;
  }

  public isAdmin():boolean {
    const user = this.currentUser;
    if (user === null || user === undefined) return false;
    return user.isAdmin;
  }

  ngOnInit(){
    this.labelService.getAll()
      .then(labels => { 
        this.mapLabels(labels);
      });
  }

  private mapLabels(topics:Label[]):void {
    const labelsMap:Map<string, Label[]> = new Map();

    for (let topic of topics) {
      const firstChar = topic.name.charAt(0)?.toUpperCase();

      if (labelsMap.get(firstChar)) {
        labelsMap.get(firstChar)?.push(topic)
      } else {
        labelsMap.set(firstChar, [topic])
      }
    }

    this.labelsMap = labelsMap;
    this.labelsMapKeys = Array.from(labelsMap.keys());
  }

  public createLabel(form:NgForm):void {
    if (!form.valid) {
      return;
    }
    console.log(form.value.name);
    this.labelService.createLabel(form.value.name);
    window.location.reload();
  }
  
  public deleteLabel(id:number):void {
    if (!id) {
      return;
    }
    this.labelService.deleteLabel(id);
    window.location.reload();
  }

}
