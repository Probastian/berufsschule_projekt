import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelsComponent } from './labels.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LabelsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class LabelsModule { }
