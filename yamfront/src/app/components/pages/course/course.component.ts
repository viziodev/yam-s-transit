import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CourseService} from '../../../services/api/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  constructor(private courseService: CourseService) { }
  menus: any;
  courses: any;
  semaine: string = '';
  moisAnnee: string= '';

  @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent: ElementRef<any>;

  ngOnInit(): void {
    this.menus = [  {
      title: 'Courses',
      url: 'Pages',
    },  {
      title: 'Statistiques',
      url: 'Pages',
    }
    ];

    this.listCourse();

  }

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 270), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 270), behavior: 'smooth' });
  }


  listCourse(filtre = '') {
 this.courseService.listCourse(filtre).subscribe(
      data => {
        console.log(data)
        this.courses=data
      }
    );
  }
  filterCourse() {
    if (this.semaine != '' &&  this.moisAnnee != '') {
      const filtre = '?semaine=' + this.semaine + '&moisAnnee=' + this.moisAnnee
      this.courseService.listCourse(filtre).subscribe(
        data => {
          console.log(data)
          this.courses = data
        }
      );
    }
  }
}
