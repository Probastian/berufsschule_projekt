import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.sass']
})
export class TopicComponent implements OnInit {
  public availableLabels: string[];

  @ViewChild('autocomplete')
  public autocomplete: ElementRef | undefined;

  @ViewChild('label')
  public label: ElementRef | undefined;

  constructor() {
    this.availableLabels = this.getAvailableLabels();
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void { }

  getAvailableLabels(): string[] {
    return [
      "label1",
      "label2",
      "test1",
      "kack"
    ];
  }

  addLabel(element: any): void {
    element = element.target;
    if (element.value == "") {
      return
    }
    if (!this.isLabelValid(element.value)) {
      alert("Not a valid label!")
      return
    }
    //<li class="labeltag" (click)="removeLabel($event)">Label</li>
    let newElem = document.createElement("li")
    newElem.classList.add("labeltag")
    newElem.classList.add("labeltag-interactive")
    newElem.innerHTML = element.value;
    element.parentElement.insertBefore(newElem, element);
    element.value = "";
  }

  removeLabel(element: any): void {
    element.target.remove();
  }

  isLabelValid(labelname: string): boolean {
    return this.availableLabels.includes(labelname);
  }

  @HostListener('click', ['$event']) onClick(event:any) {
    if (event.target.classList.contains("labeltag")) {
      this.removeLabel(event);
    }
  }
}
