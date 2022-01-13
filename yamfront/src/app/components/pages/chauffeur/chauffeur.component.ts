import {Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ParamsService} from "../../../services/api/params-service";
import {ChauffeurService} from "../../../services/api/chauffeur-service";
import {CardComponent} from "../../shared/card/card.component";
import {CardChauffeurComponent} from "../../shared/card-chauffeur/card-chauffeur.component";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {AlertService} from "../../../services/alert.service";
import {CamionService} from "../../../services/api/camion.service";

@Component({
  selector: 'app-chauffeur',
  templateUrl: './chauffeur.component.html',
  styleUrls: ['./chauffeur.component.scss']
})
export class ChauffeurComponent implements OnInit {
  menus: any[];
  id: any;
  chauffeur: any;
  listChauffeursSecon: any[];
  page: any = 1;
  camions: any[] = [];
  chauffeurToDelete: any[] = [];
  ENDPOINT = environment.ENDPOINT;
  loaderList: boolean = false;
  loaderAdd: boolean = true;
  loaderDetails: boolean = false;
  allChauffeurs: any[] = [];
  modalTitle:string;
  size:string;
  imgURL='./assets/images/avatar.jpg';
  imgChauffeurSecon='./assets/images/placeholder.png';
  stopScroll: boolean = false;

  listCamions:any;
  listTypePermis:any;
  selectChauffeur:boolean;
  menuOpen: boolean = false;
  chauffeurForm: FormGroup ;
  @ViewChild('toggleButton') toggleButton: ElementRef;
  @ViewChildren(CardChauffeurComponent) cards: QueryList<CardChauffeurComponent>;
  @ViewChild('chauffeursList') chauffeursList: ElementRef;
  private avatarImg: any;

  constructor(private renderer: Renderer2, private fb: FormBuilder, private camionService: CamionService,private paramsService: ParamsService,private alertService: AlertService,private chauffeurService: ChauffeurService) {
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
    this.paramsService.listChauffeursSelect('?etat=Disponible&type=Secondaire').subscribe(
      data => {
        this.listChauffeursSecon=data['hydra:member'];
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
    this.getChauffeurs()
    this.selectChauffeur = false;
    this.menus = [  {
      title: 'Chauffeurs',
      url: 'Pages',
    },  {
      title: 'Statistiques',
      url: 'Pages',
    }
    ]

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
    this.loaderAdd = false;
    const formdata = new FormData();
    this.checkVerif();
    formdata.append('filePhoto',this.avatarImg)
    formdata.append('nomComplet',this.chauffeurForm.value.nom)
    formdata.append('adresse',this.chauffeurForm.value.adresse)
    formdata.append('description',this.chauffeurForm.value.description)
    formdata.append('tel1',this.chauffeurForm.value.tel1)
    formdata.append('tel2',this.chauffeurForm.value.tel2)
    formdata.append('dateNaissance',this.chauffeurForm.value.dateNaissance)
    formdata.append('typePermisId',this.chauffeurForm.value.typePermis)
    formdata.append('numeroPermis',this.chauffeurForm.value.numeroPermis)
    formdata.append('dateDebutValidite',this.chauffeurForm.value.debut)
    formdata.append('dateFinValidite',this.chauffeurForm.value.fin)
    formdata.append('type',this.chauffeurForm.value.typeChauffeur)
    formdata.append('tabTypeCamion',JSON.stringify(this.camions))
    this.chauffeurService.addChauffeurs(formdata).subscribe(
      data =>{
        this.alertService.successDangerNotif('success','Chauffeur ajouté avec succés');
        this.loaderAdd = true;
        setInterval(function () {
          window.location.reload()
        },3200)

        console.log(data)
      },error => {
        this.alertService.successDangerNotif('danger','Erreur lors de la création du chauffeur !');
        this.loaderAdd = true;

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
  getChauffeurs(){
    this.loaderList = false;
    let params=`&page=${this.page}`
    this.chauffeurService.listAllChauffeurs(params).subscribe(
      (data:any) => {
        this.loaderList = true;
        if(data['hydra:member']){
          if (data['hydra:member'].length>0){

          for (const chauf of data['hydra:member']) {
            this.allChauffeurs.push(chauf)
          }
          }else {
            this.stopScroll = true;
          }
        }
        this.page++;

        console.log(data)
      },(error)=>{
        this.loaderList = true;

        console.log(error)
      }
    )
  }

  getSelectedChauffeur(id){
    this.cards.forEach((card) => {
      if (card.cardId != id) {
         card.isExpanded = false;
      }
    });
  }

  getAction(e){
    this.id = e?.id;
    if(e?.type == 'Details'){
      const detailsButton = document.getElementById('detailsChauf');
      detailsButton.click();
      this.getDetailsChauffeur();
    }else if (e?.type == 'Archiver'){
      this.deleteChauffeur()
    }
    this.chauffeurToDelete = [];
    this.chauffeurToDelete.push(e);
  }


  deleteChauffeur(){
    Swal.fire({
      title: 'Etes vous sure de vouloir archiver ce chauffeur?',
      text: "Cet action est irreversible!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, archiver!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loaderList = false;
        this.chauffeurService.archiverChauffeur(this.chauffeurToDelete).subscribe(
          data =>{
            this.loaderList = true;
            this.alertService.successDangerNotif('success','Suppression effectuée avec succés!')
            setTimeout(function () {
              window.location.reload();
            },3500)
            console.log(data)
          }, error =>{
            this.loaderList = true;
          }
        )

      }
    })
  }
  scrolling(){
    if (this.stopScroll == true){
      return;
    }
    // @ts-ignore
    const scrollZone = document.getElementById('scrollZone');
    const st = scrollZone.scrollTop;
    const sh = scrollZone.scrollHeight;
    const ch = scrollZone.clientHeight;
    console.log(st)
    console.log(sh)
    console.log(ch)
    if (sh - st <= ch) {
      this.getChauffeurs();
      //   this.currentPage++;
      // this.paginateUser(this.currentPage);
    }
  }
  getDetailsChauffeur(){
    this.loaderDetails=false;
    this.chauffeurService.detailsChauffeur(this.id).subscribe(
      data => {
        this.loaderDetails=true;
        this.chauffeur = data;
      }
    )
  }
  changeChauffeur(chauffeur){
    chauffeur?.photo != null? this.imgChauffeurSecon =   this.ENDPOINT+'uploads/images/'+chauffeur?.photo:''
    this.camionService.changeChauffeur({idCamion :this.id,newChauffeur: chauffeur?.id,oldChauffeur: this.chauffeur?.id}).subscribe(
      (data) =>{
        console.log(data)
      }
    )
  }
}
