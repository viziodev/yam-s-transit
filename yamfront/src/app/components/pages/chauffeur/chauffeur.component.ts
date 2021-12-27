import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ParamsService} from "../../../services/api/params-service";
import {ChauffeurService} from "../../../services/api/chauffeur-service";

@Component({
  selector: 'app-chauffeur',
  templateUrl: './chauffeur.component.html',
  styleUrls: ['./chauffeur.component.scss']
})
export class ChauffeurComponent implements OnInit {
  menus: any[];
  camions: any[] = [];
  modalTitle:string;
  size:string;
  imgURL='./assets/images/avatar.jpg';
  listCamions:any;
  listTypePermis:any;
  selectChauffeur:boolean;
  menuOpen: boolean = false;
  chauffeurForm: FormGroup ;
  @ViewChild('toggleButton') toggleButton: ElementRef;
  @ViewChild('chauffeursList') chauffeursList: ElementRef;
  private avatarImg: any;

  constructor(private renderer: Renderer2, private fb: FormBuilder,private paramsService: ParamsService,private chauffeurService: ChauffeurService) {
    this.chauffeurForm = this.fb.group({
      nom: ['', [Validators.required]],
      email: [''],
      adresse: ['', [Validators.required]],
      description: ['', [Validators.required]],
      tel1: ['', [Validators.required]],
      tel2: ['', [Validators.required]],
      dateNaissance: ['', [Validators.required]],
      typePermis: ['', [Validators.required]],
      numeroPermis: ['', [Validators.required]],
      debut: ['', [Validators.required]],
      fin: ['', [Validators.required]],
      typeChauffeur: ['', [Validators.required]],
      camions: this.fb.array([

      ]),
    });
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.selectChauffeur) {
        this.menuOpen = false;
      }
      this.selectChauffeur = false;
    });
    this.paramsService.listTypesCamions().subscribe(
    (data: any) => {
      this.listCamions=data['hydra:member'];
      console.log(data)
    }
    )
    this.paramsService.listTypePermisSelect().subscribe(
      data =>{
        this.listTypePermis=data['hydra:member'];

        console.log(data)
    }
    )
  }
  ngOnInit(): void {
    this.selectChauffeur = false;
    this.menus = [  {
      title: 'Chauffeurs',
      url: 'Pages',
    },  {
      title: 'Statistiques',
      url: 'Pages',
    }
    ]
    this.chauffeurService.listAllChauffeurs().subscribe(
      data => {
        console.log(data)
      }
    )
  }
  addChauffeur(){
    this.modalTitle='Ajout d\' un chauffeur';
    this.size="complet";
  }

  detailsChauffeur(){
    this.modalTitle='Details d\' un chauffeur';
    this.size="complet";
  }


  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  preventCloseOnClick() {
    this.selectChauffeur = true;
  }
  createChauffeur(){
    const formdata = new FormData();
    this.checkVerif();
    formdata.append('filePhoto',this.avatarImg)
    formdata.append('nomComplet',this.chauffeurForm.value.nom)
    formdata.append('adresse',this.chauffeurForm.value.adresse)
    formdata.append('description',this.chauffeurForm.value.description)
    formdata.append('tel1',this.chauffeurForm.value.tel1)
    formdata.append('tel2',this.chauffeurForm.value.tel2)
    formdata.append('dateNaissance',this.chauffeurForm.value.dateNaissance)
    formdata.append('typePermis',this.chauffeurForm.value.typePermis)
    formdata.append('numeroPermis',this.chauffeurForm.value.numeroPermis)
    formdata.append('dateDebutValidite',this.chauffeurForm.value.debut)
    formdata.append('dateFinValidite',this.chauffeurForm.value.fin)
    formdata.append('type',this.chauffeurForm.value.typeChauffeur)
    formdata.append('tabTypeCamion',JSON.stringify(this.camions))
    this.chauffeurService.addChauffeurs(formdata).subscribe(
      data =>{
        console.log(data)
      }
    )
  }
  clickUpload(){
    const input = document.getElementById("avatar");
    input.click();
  }

  preview(files, e) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert('Image invalide');
      this.imgURL='./assets/images/avatar.jpg';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      // @ts-ignore
      this.imgURL = reader.result;
    };
    this.avatarImg = e.target.files[0];

  }
    checkVerif() {
    var cboxes = document.getElementsByName('camions[]');
    var len = cboxes.length;
      console.log(cboxes)

      for (var i=0; i<len; i++) {
        // @ts-ignore
         if (cboxes[i].checked){

           this.camions.push({id:cboxes[i].id})
           console.log(this.camions)
        }
       }
  }
}
