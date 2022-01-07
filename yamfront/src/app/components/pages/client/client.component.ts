import {Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CardChauffeurComponent} from "../../shared/card-chauffeur/card-chauffeur.component";
import {ParamsService} from "../../../services/api/params-service";
import {AlertService} from "../../../services/alert.service";
import Swal from "sweetalert2";
import {ClientService} from "../../../services/api/client-service";
import {ClientCardComponent} from "../../shared/client-card/client-card.component";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  menus: any[];
  id: any;
  chauffeur: any;
  listTypeCamionTonne: any;
  page: any = 1;
  camions: any[] = [];
  clients: any[] = [];
  clientToDelete: any[] = [];
  ENDPOINT = environment.ENDPOINT;
  loaderList: boolean = false;
  loaderAdd: boolean = true;
  loaderDetails: boolean = false;
  allChauffeurs: any[] = [];
  modalTitle:string;
  size:string;
  imgURL='./assets/images/avatar.jpg';
  listCamions:any;
  listTypePermis:any;
  selectChauffeur:boolean;
  menuOpen: boolean = false;
  clientForm: FormGroup ;
  @ViewChild('toggleButton') toggleButton: ElementRef;
  @ViewChildren(ClientCardComponent) cards: QueryList<ClientCardComponent>;
  @ViewChild('chauffeursList') chauffeursList: ElementRef;
  private avatarImg: any;

  constructor(private renderer: Renderer2, private fb: FormBuilder,private paramsService: ParamsService,private alertService: AlertService,private clientService: ClientService) {
    this.clientForm = this.fb.group({
      nomComplet: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      typeTrajet: ['', [Validators.required]],
      dureeTrajet: ['', [Validators.required]],
      frequenceChargement: ['', [Validators.required]],
      lieuChargement: ['', [Validators.required]],
      lieuDechargement: ['', [Validators.required]],
      jourChargement: ['', [Validators.required]],
      jourDechargement: ['', [Validators.required]],
      debut: ['', [Validators.required]],
      fin: ['', [Validators.required]],
      tonnage: ['', [Validators.required]],
      marchandise:['', [Validators.required]],
    });
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.selectChauffeur) {
        this.menuOpen = false;
      }
      this.selectChauffeur = false;
    });
   this.getClients();
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
   // this.getChauffeurs()
    this.selectChauffeur = false;
    this.menus = [  {
      title: 'Client',
      url: 'Pages',
    },  {
      title: 'Statistiques',
      url: 'Pages',
    }
    ]
  this.paramsService.listTypeCamionTonne().subscribe(
    (data:any) => {
      this.listTypeCamionTonne=data['hydra:member']
    }
  )
  }
  addClient(){
    this.modalTitle='Ajout d\'un client';
    this.size="moitie";
  }

  detailsClient(){
    this.modalTitle='Details du client';
    this.size="complet";
  }
  preventCloseOnClick() {
    this.selectChauffeur = true;
  }
  createClient(){
    console.log(this.clientForm.value)
     this.loaderAdd = false;
    const formdata = new FormData();
    this.checkVerif();
     formdata.append('filePhoto',this.avatarImg)
    formdata.append('nomComplet',this.clientForm.value.nom)
    formdata.append('tel',this.clientForm.value.tel)
    formdata.append('typeTrajet',this.clientForm.value.typeTrajet)
    formdata.append('dureeTrajet',this.clientForm.value.dureeTrajet)
    formdata.append('typePermisId',this.clientForm.value.typePermis)
    formdata.append('frequenceChargement',this.clientForm.value.frequenceChargement)
    formdata.append('dateDebutValidite',this.clientForm.value.debut)
    formdata.append('dateFinValidite',this.clientForm.value.fin)
    formdata.append('lieuChargement',this.clientForm.value.lieuChargement)
    formdata.append('lieuDechargement',this.clientForm.value.lieuDechargement)
    formdata.append('jourChargement',this.clientForm.value.jourChargement)
    formdata.append('debut',this.clientForm.value.debut)
    formdata.append('fin',this.clientForm.value.fin)
    formdata.append('tonnage',this.clientForm.value.tonnage)
    formdata.append('marchandise',this.clientForm.value.marchandise)
     this.clientService.addClient(formdata).subscribe(
      data =>{
        this.alertService.successDangerNotif('success','Client ajouté avec succés');
        this.loaderAdd = true;
        setInterval(function () {
          window.location.reload()
        },3200)

        console.log(data)
      },error => {
        this.alertService.successDangerNotif('danger','Erreur lors de la création du client !');
        this.loaderAdd = true;

      }
    )
  }
  clickUpload(){
    const input = document.getElementById("avatar");
    input.click();
  }
getClients(){
  this.loaderList = false;
  this.clientService.listClients().subscribe((data: any) =>{
    this.loaderList = true;
    for (let i = 0; i <data?.data.length ; i++) {
      this.clients.push(data.data[i])
    }
  })
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
  /*getChauffeurs(){
    let params=`&page=${this.page}`
    this.clientService.listAllClient(params).subscribe(
      (data:any) => {
        this.loaderList = true;
        if(data['hydra:member']){
          this.page++;
          for (const chauf of data['hydra:member']) {
            this.allChauffeurs.push(chauf)
          }
        }

        console.log(data)
      },(error)=>{
        this.loaderList = true;

        console.log(error)
      }
    )
  }*/

  getSelectedClient(id){
    console.log(id)
    this.cards.forEach((card) => {
      if (card.cardId != id) {
        card.isExpanded = false;
      }
    });
  }

  getAction(e){
    console.log(e,'""""""""""""""""""""""""')
    this.id = e?.id;
    if(e?.type == 'Details'){
      const detailsButton = document.getElementById('detailsClient');
      detailsButton.click();
      this.getDetailsClient();
    }else if (e?.type == 'Archiver'){
      this.deleteClient()
    }
    this.clientToDelete = [];
    this.clientToDelete.push(e);
  }


  deleteClient(){
    Swal.fire({
      title: 'Etes vous sure de vouloir archiver ce client?',
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
        this.clientService.archiverClient(this.clientToDelete).subscribe(
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
    // @ts-ignore
    const scrollZone = document.getElementById('scrollZone');
    const st = scrollZone.scrollTop;
    const sh = scrollZone.scrollHeight;
    const ch = scrollZone.clientHeight;
    console.log(st)
    console.log(sh)
    console.log(ch)
    if (sh - st <= ch) {
    //  this.getChauffeurs();
      //   this.currentPage++;
      // this.paginateUser(this.currentPage);
    }
  }
  getDetailsClient(){
    this.loaderDetails=false;
    this.clientService.detailsClient(this.id).subscribe(
      data => {
        this.loaderDetails=true;
        this.chauffeur = data;
      },(error)=>{
        this.loaderDetails = true;

        console.log(error)
      }
    )
  }

}
