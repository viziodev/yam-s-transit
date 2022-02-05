import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CourseService} from '../../../services/api/course.service';
import {environment} from '../../../../environments/environment';
import {ChauffeurService} from '../../../services/api/chauffeur-service';
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  constructor(private courseService: CourseService, private chauffeurService: ChauffeurService, private alertService: AlertService) { }
  menus: any;
  traitement: any;
  camionsDispo: any;
  chauffeursDispo: any;
  courses: any;
  montantVerse: any = 0;
  camion: any;
  depense: any;
  id: any;
  borderau: any;
  loaderAction = false;
  paiementCourse: any = 0;
  appreciationChauffeur: any;
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
    this.id = e?.course?.id;
    this.courseService.getCamionsDispo({id: e.course.id}).subscribe(
      data => {
        this.camionsDispo = data;
      }
    );
    this.chauffeurService.listAllChauffeurs('Disponible').subscribe(
      data => {
        console.log(data);
        this.chauffeursDispo = data;
      }
    );
    this.traitement = undefined;
    this.traitement = e;
    console.log( this.traitement);
    const traitementModal = document.getElementById('traitement');
    traitementModal.click();

    if (e?.type == 'Valider'){


    }
  }
  getSelectedCourse(e){
    console.log(e);
  }

  validerCourse(){
    this.loaderAction = true;
    const body = {montantVerse: this.montantVerse, depense: this.depense, camion: this.camion, id: this.id};
    this.courseService.validerCourse(body).subscribe(
      data => {
        this.loaderAction = false;
        console.log(data);

        this.alertService.successDangerNotif('success','Course validée avec succés!')
        setTimeout(function () {
          document.location.reload()
        }, 3000)
      },
        error => {
          this.alertService.successDangerNotif('warning','Erreur lors de la validation de la course!')

          this.loaderAction = false;
       }
    );
  }

  annulerCourse(){
    this.loaderAction = true;
    this.courseService.annulerCourse(this.id).subscribe(
      data => {
        this.loaderAction = false;
        console.log(data);

        this.alertService.successDangerNotif('success','Course annulée avec succés!')
        setTimeout(function () {
          document.location.reload()
        }, 3000)
      }, error => {
        this.alertService.successDangerNotif('warning','Erreur lors de l\'annulation de la course!')

        this.loaderAction = false;
      }
    );
  }
  lancerCourse(){
    this.loaderAction = true;

    this.courseService.lancerCourse(this.id).subscribe(
      data => {
        this.loaderAction = false;

        this.alertService.successDangerNotif('success','Course lancée avec succés!')
        setTimeout(function () {
          document.location.reload()
        }, 3000)
        console.log(data);
      }, error => {
        this.loaderAction = false;
        this.alertService.successDangerNotif('warning','Erreur lors du lancement de la course!')

      }
    );
  }

  terminerCourse(){
    this.loaderAction = true;
    const formdata = new FormData();
    formdata.append('bordereau', this.borderau);
    formdata.append('paiement', this.paiementCourse);
    formdata.append('appreciationChauffeur', this.appreciationChauffeur);
    formdata.append('id', this.id);
    this.courseService.terminerCourse(formdata).subscribe(
      data => {
        this.loaderAction = false;

        this.alertService.successDangerNotif('success', 'Course terminée avec succés!')
        setTimeout(function () {
          document.location.reload();
        }, 3000);
        console.log(data);
      }, error => {
        this.alertService.successDangerNotif('warning','Erreur lors de la finalisation de la course!')

        this.loaderAction = false;
      }
    );
  }
  uploadFileBorderau(){
    const fileBorderau = document.getElementById('fileBorderau');
    fileBorderau.click();
  }
  uploadedFile(e){
    this.borderau = e.target.files[0];

  }
}
