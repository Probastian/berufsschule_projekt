import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PostModule { }
