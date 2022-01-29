import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CourseService} from '../../../services/api/course.service';
import {environment} from "../../../../environments/environment";
import {ChauffeurService} from "../../../services/api/chauffeur-service";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  constructor(private courseService: CourseService,private chauffeurService: ChauffeurService) { }
  menus: any;
  traitement: any;
  camionsDispo: any;
  chauffeursDispo: any;
  courses: any;
  semaine = '';
  moisAnnee = '';
  filterEtat = '';
  filterType = '';
  filtreCourse = '';
  ENDPOINT = environment.ENDPOINT;

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
        console.log(data);
        this.courses = data;
      }
    );
  }
  filterCourse() {
    if (this.semaine != '' &&  this.moisAnnee != '') {
      let filtre = '?semaine=' + this.semaine + '&moisAnnee=' + this.moisAnnee;
      this.filtreCourse.trim() != '' ? filtre += '&filtreCourse=' + this.filtreCourse : '';
      this.filterEtat.trim() != '' ? filtre += '&filterEtat=' + this.filterEtat : '';
      this.filterType.trim() != '' ? filtre += '&filterType=' + this.filterType : '';
      this.courseService.listCourse(filtre).subscribe(
        data => {
          console.log(data);
          this.courses = data;
        }
      );
    }
  }
  filterCourseSearch() {
      let filtre = '?y=9' ;
      this.filtreCourse.trim() != '' ? filtre += '&filtreCourse=' + this.filtreCourse : '';
      this.semaine.trim() != '' ? filtre += '&semaine=' + this.semaine : '';
      this.moisAnnee.trim() != '' ? filtre += '&moisAnnee=' + this.moisAnnee : '';
      this.filterEtat.trim() != '' ? filtre += '&filterEtat=' + this.filterEtat : '';
      this.filterType.trim() != '' ? filtre += '&filterType=' + this.filterType : '';
      this.courseService.listCourse(filtre).subscribe(
        data => {
          console.log(data);
          this.courses = data;
        }
      );

  }
  getAction(e){
    this.courseService.getCamionsDispo({id: e.course.id}).subscribe(
      data => {
        this.camionsDispo = data
      }
    );
    this.chauffeurService.listAllChauffeurs('Disponible').subscribe(
      data => {
        console.log(data)
        this.chauffeursDispo = data;
      }
    );
    this.traitement = e;
    console.log( this.traitement)
    const traitementModal = document.getElementById('traitement')
    traitementModal.click()
    if(e?.type == 'Valider'){


    }
  }
  getSelectedCourse(e){
    console.log(e)
  }
}
