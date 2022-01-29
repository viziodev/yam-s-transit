import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-card-course',
  templateUrl: './card-course.component.html',
  styleUrls: ['./card-course.component.scss']
})
export class CardCourseComponent implements OnInit {
  @Input()  course;
  ENDPOINT = environment.ENDPOINT;
  @Input()  isExpanded: boolean =false;
  @Output() clickedAction = new EventEmitter<any>();
  @Output() clickActionItem = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  clickedActionItem(actionId,type) {
    this.isExpanded = false;
    this.clickActionItem.emit({id: actionId, type: type, course: this.course});
  }

  clickedActionner(actionId) {
    this.isExpanded = !this.isExpanded;
    this.clickedAction.emit(actionId);
  }
}
