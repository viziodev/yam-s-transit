import {Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ParamsService} from "../../../services/api/params-service";
import {CamionService} from "../../../services/api/camion.service";
import {AlertService} from "../../../services/alert.service";
import {CardComponent} from "../../shared/card/card.component";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-camion',
  templateUrl: './camion.component.html',
  styleUrls: ['./camion.component.scss']
})
export class CamionComponent implements OnInit {
  @ViewChildren(CardComponent) cards: QueryList<CardComponent>;
  menus: any[];
  id: any;
  listTypesCamions: any[];
  listMarques: any[];
  listModeles: any[];
  allCamions: any[] = [];
   pieces: any;
   filtreMarque: any = '';
  filtreCategorie: any = '';
   filtreModele: any= '';
   filtreEtat: any= '';
   page: number=1;
  camion: any;
  loaderList: boolean = false;
  stopScroll: boolean = false;
  loaderDetails: boolean = false;
  loaderAdd: boolean = true;
  listChauffeursPrin: any[];
  listChauffeursSecon: any[];
  listChauffeursChips: any[]=[];
  deletingSelection: any[]=[];
  modalTitle:string;
  size:string;
  selectedTypeCamion:any;
  selectedCP:any;
  selectedCS:any = [];
  selectedModeleCamion:any;
  search:string='';
  selectChauffeur:boolean;
  camionForm:FormData;
  camionDetailsForm:FormGroup;
  imgURL='./assets/images/placeholder.png';
  imgChauffeurSecon='./assets/images/placeholder.png';
  ENDPOINT = environment.ENDPOINT;
  private camionImg: any;
  menuOpen: boolean = false;
  @ViewChild('toggleButton') toggleButton: ElementRef;
  @ViewChild('chauffeursList') chauffeursList: ElementRef;

  constructor(private renderer: Renderer2,private fb: FormBuilder,private paramsService: ParamsService,private camionService: CamionService,private alertService: AlertService) {
    this.camionDetailsForm=this.fb.group({
      immatriculation:['',[Validators.required]],
      marque:['',[Validators.required]],
      typeCamion:['',[Validators.required]],
      typeCarburant:['',[Validators.required]],
      modeleCamion:['',[Validators.required]],
      deAssurance:['',[Validators.required]],
      deCg:['',[Validators.required]],
      deVt:['',[Validators.required]],
      deExtincteur:['',[Validators.required]],
      deLicenceTransport:['',[Validators.required]],
      deExpertise:['',[Validators.required]],
      chaufPrin:['',[Validators.required]],
    })
    this.camionForm = new FormData();
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.selectChauffeur) {
        this.menuOpen = false;
      }
      this.selectChauffeur = false;
    });
  }
  ngOnInit(): void {
    this.getCamions();
    this.selectChauffeur = false;
    this.menus = [  {
      title: 'Camions',
      url: 'Pages',
      },  {
      title: 'Statistiques',
      url: 'Pages',
      }
    ]


    this.paramsService.listTypesCamions().subscribe(
      data => {
        this.listTypesCamions=data['hydra:member']
      }
    )
    this.paramsService.listMarques().subscribe(
      data => {
        this.listMarques=data['hydra:member']
      }
    )
    this.paramsService.listModeles().subscribe(
      data => {
        this.listModeles=data['hydra:member']
      }
    )
    this.paramsService.listChauffeursSelect('?etat=Disponible&type=Principal').subscribe(
      data => {
        this.listChauffeursPrin=data['hydra:member']
      }
    )
    this.paramsService.listChauffeursSelect('?etat=Disponible&type=Secondaire').subscribe(
      data => {
        this.listChauffeursSecon=data['hydra:member'];
      }
    )
    this.camionService.listCamion().subscribe(
      data => {
        console.log(data)
      }
    )
  }
  addCamion(){
    this.modalTitle='Ajout d\' un camion';
    this.size="moitie";
  }

  detailsCamion(){
    this.modalTitle='Details d\' un camion';
    this.size="complet";
  }


  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  preventCloseOnClick() {
    this.selectChauffeur = true;
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
    this.camionImg = e.target.files[0];

  }
  clickUpload(id){
    const input = document.getElementById(id);
    input.click();
  }
  onFileSelect=(type,e)=>{
    const elem=document.getElementById(type);
    elem.innerText=e.target.files[0].name;
    console.log(e.target.files[0].name)
    this.camionForm.delete('type');
    this.camionForm.append(type, e.target.files[0])
    console.log( this.camionForm)
}
onSelectTypeCamion(){
  for (const tc of this.listTypesCamions) {
    if(tc.id == this.camionDetailsForm.value.typeCamion){
      console.log(this.selectedTypeCamion)
      this.selectedTypeCamion = tc;
    }
  }

}
onSelectChaufPrin(){
  console.log()
  for (const cp of this.listChauffeursPrin) {
    if(cp.id == this.camionDetailsForm.value.chaufPrin){
      console.log(this.selectedTypeCamion)
      this.selectedCP = cp;
    }
  }

}
  onSelectModeleCamion(){
    this.detailsModelePiece();
  for (const mod of this.listModeles) {
    if(mod.id == this.camionDetailsForm.value.modeleCamion){
      this.selectedModeleCamion = mod;
    }
  }

}
postCamion(){
    this.loaderAdd = false;
     this.camionForm.append('immatriculation',this.camionDetailsForm.value.immatriculation)
    this.camionForm.append('marqueId',this.camionDetailsForm.value.marque)
    this.camionForm.append('typeCamionId',this.camionDetailsForm.value.typeCamion)
    this.camionForm.append('typeCarburant',this.camionDetailsForm.value.typeCarburant)
    this.camionForm.append('modeleId',this.camionDetailsForm.value.modeleCamion)
    this.camionForm.append('deAssurance',this.camionDetailsForm.value.deAssurance)
    this.camionForm.append('deCg',this.camionDetailsForm.value.deCg)
    this.camionForm.append('deVt',this.camionDetailsForm.value.deVt)
    this.camionForm.append('deExtincteur',this.camionDetailsForm.value.deExtincteur)
    this.camionForm.append('deLicenceTransport',this.camionDetailsForm.value.deLicenceTransport)
    this.camionForm.append('deExpertise',this.camionDetailsForm.value.deExpertise)
    this.camionForm.append('chauffeurId',this.camionDetailsForm.value.chaufPrin)
    this.camionForm.append('camionImg',this.camionImg)
    this.checkVerif();
  this.camionService.addCamion(this.camionForm).subscribe(
    data => {
      this.loaderAdd = true;
      this.alertService.successDangerNotif('success','Camion ajouté avec succés!')
      setTimeout(function () {
        document.location.reload()
      },3500)
      console.log(data)
    },error => {
      this.loaderAdd = true;
      this.alertService.successDangerNotif('warning','Erreur lors de l\'ajout du camion!')
    }
  )
}
  checkVerif() {
    var cboxes = document.getElementsByName('chauffeurs[]');
    var len = cboxes.length;
    console.log(cboxes)

    for (var i=0; i<len; i++) {
      // @ts-ignore
      if (cboxes[i].checked){

        this.selectedCS.push({id:cboxes[i].id})
        console.log(this.listChauffeursSecon)
      }
    }
  }

  handle(){
    this.listChauffeursChips=[];
    var cboxes = document.getElementsByName('chauffeurs[]');
    var len = cboxes.length;
    console.log(cboxes)

    for (var i=0; i<len; i++) {
      // @ts-ignore
      if (cboxes[i].checked){

        for (const cp of this.listChauffeursSecon) {
          // @ts-ignore
          if(cp.id == cboxes[i].value){
            this.listChauffeursChips.push(cp)

           }
        }
        console.log(this.listChauffeursChips)
      }
    }
  }
  delChaufSec(id){
    let pos=null;
    for (let i = 0; i <this.listChauffeursChips.length ; i++) {
    if(  this.listChauffeursChips[i].id == id){
      pos=i;
    }
    }
    this.listChauffeursChips.splice(pos,1);
  }

  detailsModelePiece(){
    this.paramsService.detailsModelePiece(this.camionDetailsForm.value.modeleCamion).subscribe(
      (data: any) => {
        this.pieces= data.data;
      }
    )
  }

  getSelectedCamion(id){
    this.cards.forEach((card) => {
      if (card.cardId != id) {
        card.isExpanded = false;
      }
    });
  }

  getAction(e){
    this.id = e?.id;
    if(e?.type == 'Details'){
      const detailsButton = document.getElementById('detailsButton');
      detailsButton.click();
      this.getDetailsCamion()
    }else if (e?.type == 'Archiver'){
       this.deleteCamion()
    }
    this.deletingSelection=[];
    this.deletingSelection.push(e)
    console.log(e)
  }
  getDetailsCamion(){
    this.loaderDetails=false;
    this.camionService.detailsCamion(this.id).subscribe(
      data => {
        this.loaderDetails=true;
        this.camion = data;
        console.log(data)
      }
    )
  }
  deleteCamion(){
    Swal.fire({
      title: 'Etes vous sure de vouloir supprimer ce camion?',
      text: "Cet action est irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loaderList = false;
        this.camionService.archiverCamion(this.deletingSelection).subscribe(
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

      }else {
        this.deletingSelection = [];
      }
    })
  }
  getDeleted(e){
    let pos = null;
    if(e.type == 'delete'){
      this.deletingSelection.push(e)
    }else {
      for (let i = 0; i <   this.deletingSelection.length; i++) {
        if (  this.deletingSelection[i].id == e.id){
          pos  = i;
        }
      }
      if (pos != null){
        this.deletingSelection.splice(pos,1);
      }
    }
    console.log(  this.deletingSelection)
  }
  multipleDelete(){
    Swal.fire({
      title: 'Etes vous sure de vouloir supprimer '+this.deletingSelection.length+' camion(s)?',
      text: "Cet action est irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loaderList = false;
        this.camionService.archiverCamion(this.deletingSelection).subscribe(
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

  getCamions(filtre = ''){
    if (this.stopScroll == true){
      return;
    }
    this.loaderList = false;
    let params=`&page=${this.page}${filtre};`
    this.camionService.listAllCamions(params).subscribe(
      (data:any) => {
        this.loaderList = true;
        if (data['hydra:member'].length>0){
          for (const camionElem of data['hydra:member']) {
            this.allCamions.push(camionElem)
          }
        }else {
          this.stopScroll = true;
        }
      //  this.allCamions=data['hydra:member'];
        this.page++;
      },error => {
        this.loaderList = true;
      }
    )
  }
  scrolling(){
    // @ts-ignore
    const scrollZone = document.getElementById('scrollZone');
    const st = scrollZone.scrollTop;
    const sh = scrollZone.scrollHeight;
    const ch = scrollZone.clientHeight;
    console.log(st)
    console.log(sh)
    console.log(ch)
    if (sh - st <= ch) {
      this.getCamions();
      //   this.currentPage++;
     // this.paginateUser(this.currentPage);
    }
  }
  filter(){
    let filtre = '';
    this.filtreEtat != ''? filtre += '&etat=' + this.filtreEtat:''
    this.filtreMarque != ''? filtre +=  '&marque=' + this.filtreMarque:''
    this.filtreModele != ''? filtre +=  '&modele=' + this.filtreModele:''
    this.filtreCategorie != ''? filtre +=  '&typeCamion.id=' + this.filtreCategorie:''
    this.allCamions = [];
    this.page = 1;
    this.stopScroll=false;
    this.getCamions(filtre);
  }
  changeChauffeur(chauffeur){
   chauffeur?.photo != null? this.imgChauffeurSecon =   this.ENDPOINT+'uploads/images/'+chauffeur?.photo:''
    this.camionService.changeChauffeur({idCamion :this.id,newChauffeur: chauffeur?.id,oldChauffeur: this.camion?.chauffeur?.id}).subscribe(
      (data) =>{
        console.log(data)
      }
    )
  }
}
