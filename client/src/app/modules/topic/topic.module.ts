import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicComponent } from './topic/topic.component';
import { FormsModule } from '@angular/forms';
import { NgSelectizeModule } from 'ng-selectize';

@NgModule({
  declarations: [
    TopicComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectizeModule
  ]
})
export class TopicModule { }
