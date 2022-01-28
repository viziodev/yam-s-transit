import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-course',
  templateUrl: './card-course.component.html',
  styleUrls: ['./card-course.component.scss']
})
export class CardCourseComponent implements OnInit {
  @Input()  course;
  constructor() { }

  ngOnInit(): void {
  }

}
