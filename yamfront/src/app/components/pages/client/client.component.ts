import {Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CardChauffeurComponent} from "../../shared/card-chauffeur/card-chauffeur.component";
import {ParamsService} from "../../../services/api/params-service";
import {AlertService} from "../../../services/alert.service";
import Swal from "sweetalert2";
import {ClientService} from "../../../services/api/client-service";
import {ClientCardComponent} from "../../shared/client-card/client-card.component";
import {CourseService} from "../../../services/api/course.service";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  menus: any[];
  id: any;
  contratId: any;
  typeContrat: string = 'Retour';
  step: number = 1;
  fileContrat: any;
  client: any;
  clientToPlanCourse: any;
  montantRestant: any = '';
  selectedTonnage: any;
  courseId: any;
  loaderPay: boolean = false;
  selectedCourse: any;
  selectedContrat: any;
  filtreTel: string = '';
  filtreTypeClient: string = '';
  listTypeCamionTonne: any;
  stopScroll: boolean = false;
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
  listItins:any;
  selectChauffeur:boolean;
  menuOpen: boolean = false;
  clientForm: FormGroup ;
  courseForm: FormGroup ;
  contratForm: FormGroup ;
  filtreCoursesForm: FormGroup ;
  @ViewChild('toggleButton') toggleButton: ElementRef;
  @ViewChildren(ClientCardComponent) cards: QueryList<ClientCardComponent>;
  @ViewChild('chauffeursList') chauffeursList: ElementRef;
  private avatarImg: any;

  constructor(private renderer: Renderer2, private fb: FormBuilder,private paramsService: ParamsService,private courseService: CourseService,private alertService: AlertService,private clientService: ClientService) {
    this.clientForm = this.fb.group({
      nomComplet: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      typeTrajet: ['', [Validators.required]],
      dureeTrajet: ['', [Validators.required]],
      dureeTrajetRetour: ['', [Validators.required]],
      itineraireAller: [''],
      itineraireRetour: [''],
      periode: this.fb.array([
      this.fb.group({
          jourChargement: ['', [Validators.required]],
          jourDechargement: ['', [Validators.required]],
          jourChargementRetour: ['', [Validators.required]],
          jourDechargementRetour: ['', [Validators.required]],
          frequenceChargement: ['', [Validators.required]],
        })
      ]),
      lieuChargement: ['', [Validators.required]],
      lieuDechargement: ['', [Validators.required]],
      lieuChargementRetour: ['', [Validators.required]],
      lieuDechargementRetour: ['', [Validators.required]],
      debut: ['', [Validators.required]],
      fin: ['', [Validators.required]],
      tonnage: ['', [Validators.required]],
      cout: ['', [Validators.required]],
      coutRetour: ['', [Validators.required]],
      marchandise:['', [Validators.required]],
    });

    this.contratForm = this.fb.group({
      typeTrajet: ['', [Validators.required]],
      dureeTrajet: ['', [Validators.required]],
      dureeTrajetRetour: ['', [Validators.required]],
      itineraireRetour: [''],
      itineraireAller: [''],
      periode:this.fb.array([
      this.fb.group({
          jourChargement: ['', [Validators.required]],
          jourDechargement: ['', [Validators.required]],
          jourChargementRetour: ['', [Validators.required]],
          jourDechargementRetour: ['', [Validators.required]],
          frequenceChargement: ['', [Validators.required]],
        })
      ]),
      lieuChargement: ['', [Validators.required]],
      lieuDechargement: ['', [Validators.required]],
      lieuChargementRetour: ['', [Validators.required]],
      lieuDechargementRetour: ['', [Validators.required]],
      debut: ['', [Validators.required]],
      fin: ['', [Validators.required]],
      tonnage: ['', [Validators.required]],
      cout: ['', [Validators.required]],
      coutRetour: ['', [Validators.required]],
      marchandise:['', [Validators.required]],
    });
    this.courseForm = this.fb.group({
      nomComplet: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      typeTrajet: ['', [Validators.required]],
      dureeTrajet: ['', [Validators.required]],
      dureeTrajetRetour: ['', [Validators.required]],
      itineraireRetour: ['' ],
      itineraireAller: ['', [Validators.required]],
      lieuChargement: ['', [Validators.required]],
      lieuDechargement: ['', [Validators.required]],
      lieuChargementRetour: ['', [Validators.required]],
      lieuDechargementRetour: ['', [Validators.required]],
      dateChargement: ['', [Validators.required]],
      dateDechargement: ['', [Validators.required]],
      dateChargementRetour: ['', [Validators.required]],
      dateDechargementRetour: ['', [Validators.required]],
      tonnage: ['', [Validators.required]],
      marchandise:['', [Validators.required]],
      cout: ['', [Validators.required]],
      coutRetour: ['', [Validators.required]],
    });
    this.filtreCoursesForm=this.fb.group({
      debut: ['', [Validators.required]],
      fin: ['', [Validators.required]],
      total: ['', [Validators.required]],

    })
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
    this.paramsService.listItins().subscribe(
      data =>{
        this.listItins =data['hydra:member'];

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
  lancerCourse(){
    this.modalTitle='Lancer une nouvelle course';
    this.size="moitie";
    this.courseForm.reset()
    this.clientToPlanCourse={tel:'',nomComplet:''}
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
      formdata.append('filePhoto',this.avatarImg)
     formdata.append('fileContrat',this.fileContrat)
    formdata.append('nomComplet',this.clientForm.value.nomComplet)
    formdata.append('tel',this.clientForm.value.tel)
    formdata.append('typeTrajet',this.clientForm.value.typeTrajet)
    formdata.append('dureeTrajet',this.clientForm.value.dureeTrajet)
    formdata.append('dureeTrajetRetour',this.clientForm.value.dureeTrajetRetour)
   //  formdata.append('frequenceChargement',this.clientForm.value.frequenceChargement)

    formdata.append('lieuChargement',this.clientForm.value.lieuChargement)
    formdata.append('lieuDechargement',this.clientForm.value.lieuDechargement)
    formdata.append('lieuChargementRetour',this.clientForm.value.lieuChargementRetour)
    formdata.append('lieuDechargementRetour',this.clientForm.value.lieuDechargementRetour)
   // formdata.append('jourChargement',this.clientForm.value.jourChargement)
    formdata.append('debut',this.clientForm.value.debut)
    formdata.append('periode',JSON.stringify(this.clientForm.value.periode))
    formdata.append('fin',this.clientForm.value.fin)
    formdata.append('typeClient','Contractuel')
    formdata.append('tonnage',this.clientForm.value.tonnage)
    formdata.append('coutRetour',this.clientForm.value.coutRetour)
    formdata.append('cout',this.clientForm.value.cout)
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
        this.alertService.successDangerNotif('warning','Erreur lors de la création du client !');
        this.loaderAdd = true;

      }
    )
  }

  createContrat(){
    console.log(this.contratForm.value)
    this.loaderAdd = false;
    const formdata = new FormData();
     formdata.append('fileContrat',this.fileContrat)
     formdata.append('idClient',this.id)
     formdata.append('typeTrajet',this.contratForm.value.typeTrajet)
    formdata.append('dureeTrajet',this.contratForm.value.dureeTrajet)
    formdata.append('dureeTrajetRetour',this.contratForm.value.dureeTrajetRetour)
    //  formdata.append('frequenceChargement',this.clientForm.value.frequenceChargement)

    formdata.append('lieuChargement',this.contratForm.value.lieuChargement)
    formdata.append('lieuDechargement',this.contratForm.value.lieuDechargement)
    formdata.append('lieuChargementRetour',this.contratForm.value.lieuChargementRetour)
    formdata.append('lieuDechargementRetour',this.contratForm.value.lieuDechargementRetour)
    // formdata.append('jourChargement',this.clientForm.value.jourChargement)
    formdata.append('debut',this.contratForm.value.debut)
    formdata.append('periode',JSON.stringify(this.contratForm.value.periode))
    formdata.append('fin',this.contratForm.value.fin)
    formdata.append('typeClient','Contractuel')
    formdata.append('tonnage',this.contratForm.value.tonnage)
    formdata.append('coutRetour',this.contratForm.value.coutRetour)
    formdata.append('cout',this.contratForm.value.cout)
    formdata.append('marchandise',this.contratForm.value.marchandise)
    this.clientService.addContrat(formdata).subscribe(
      data =>{
        this.alertService.successDangerNotif('success','Contrat ajouté avec succés');
        this.loaderAdd = true;
        setInterval(function () {
          window.location.reload()
        },3200)

        console.log(data)
      },error => {
        this.alertService.successDangerNotif('warning', 'Erreur lors de la création du contrat !');
        this.loaderAdd = true;

      }
    )
  }
  clickUpload(id){
    const input = document.getElementById(id);
    input.click();
  }
getClients(filtre=''){
  let params=`&page=${this.page}${filtre}`

  this.loaderList = false;
  this.clientService.listClients(params).subscribe((data: any) =>{
    this.loaderList = true;
       if (data.data.length>0){
    for (let i = 0; i <data?.data.length ; i++) {
      this.clients.push(data.data[i])
    }
    }else {
         this.stopScroll = true;
       }
       this.page++;
  },(error:any)=>{
    this.loaderList = true;
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
  /* checkVerif() {
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

  getSelectedCourse(){
    console.log( this.courseId)
    console.log(this.selectedContrat.courses)
    this.selectedContrat.courses?.forEach((course) => {
      if (course?.id == this.courseId) {
        this.selectedCourse = course;
        console.log(this.selectedCourse)
      }
    });
  }

  getAction(e){
    console.log(e,'""""""""""""""""""""""""')
    this.id = e?.id;
    if(e?.type == 'Details'){
      this.detailsClient()
      this.selectedCourse = null;
this.selectedContrat=null
      const detailsButton = document.getElementById('detailsClient');
      detailsButton.click();
      this.getDetailsClient();

    }else if (e?.type == 'Archiver'){
      this.deleteClient()
    }else if (e?.type == 'Lancer course'){
     this.lancerCourse()
      const lancerCourse = document.getElementById('lancerCourse');
      lancerCourse.click();
      this.clientToPlanCourse = e?.client;
      this.courseForm.value.tel =   this.clientToPlanCourse?.tel
      this.courseForm.value.nomComplet =   this.clientToPlanCourse?.nomComplet
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
  filter(){
    let filtre = '';
    this.filtreTel != ''? filtre += '&tel=' + this.filtreTel:''
    this.filtreTypeClient!= ''? filtre +=  '&typeClient=' + this.filtreTypeClient:''
    this.clients = [];
    this.page = 1;
    this.stopScroll=false;
    this.getClients(filtre);
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
      this.getClients()
    //  this.getChauffeurs();
      //   this.currentPage++;
      // this.paginateUser(this.currentPage);
    }
  }
  getDetailsClient(){
    this.loaderDetails=false;
    this.clientService.detailsClient(this.id).subscribe(
      (data:any) => {
        this.loaderDetails=true;
        this.client = data;
        this.selectedContrat =data?.contrats[0]
        console.log( data,this.selectedContrat )
      },(error)=>{
        this.loaderDetails = true;

        console.log(error)
      }
    )
  }

  get periode() {
    return this.clientForm.get('periode') as FormArray;
  }

  removePeriode(index) {
    return this.periode.removeAt(index);
  }

   addPeriode() {
    this.periode.push(
      this.fb.group({
        jourChargement: ['', [Validators.required]],
        jourDechargement: ['', [Validators.required]],
        jourChargementRetour: ['', [Validators.required]],
        jourDechargementRetour: ['', [Validators.required]],
        frequenceChargement: ['', [Validators.required]],
      })
     )
    return this.clientForm.get('periode') as FormArray;
  }

  get periodeContrat() {
    return this.contratForm.get('periode') as FormArray;
  }

  removePeriodeContrat(index) {
    return this.periodeContrat.removeAt(index);
  }

   addPeriodeContrat() {
    this.periodeContrat.push(
      this.fb.group({
        jourChargement: ['', [Validators.required]],
        jourDechargement: ['', [Validators.required]],
        jourChargementRetour: ['', [Validators.required]],
        jourDechargementRetour: ['', [Validators.required]],
        frequenceChargement: ['', [Validators.required]],
      })
     )
    return this.clientForm.get('periode') as FormArray;
  }

  onFileSelect=(type,e)=>{
    const elem=document.getElementById(type);
    elem.innerText=e.target.files[0].name;
    console.log(e.target.files[0].name)
  //  this.camionForm.delete('type');
   this.fileContrat=  e.target.files[0]
   // console.log( this.camionForm)
  }

  setStep(step){
    this.step = step;
  }

  createCourse(){
    this.loaderAdd = false;

    const formdata = new FormData();
   // formdata.append('fileContrat',this.fileContrat)
   // formdata.append('idClient',this.id)
    formdata.append('nomComplet',this.courseForm.value.nomComplet)
    formdata.append('tel',this.courseForm.value.tel)
    formdata.append('typeTrajet',this.courseForm.value.typeTrajet)
    formdata.append('dureeTrajet',this.courseForm.value.dureeTrajet)
    formdata.append('dureeTrajetRetour',this.courseForm.value.dureeTrajetRetour)
    //  formdata.append('frequenceChargement',this.clientForm.value.frequenceChargement)

    formdata.append('lieuChargement',this.courseForm.value.lieuChargement)
    formdata.append('lieuDechargement',this.courseForm.value.lieuDechargement)
    formdata.append('lieuChargementRetour',this.courseForm.value.lieuChargementRetour)
    formdata.append('lieuDechargementRetour',this.courseForm.value.lieuDechargementRetour)

    formdata.append('dateChargement',this.courseForm.value.dateChargement)
    formdata.append('dateDechargement',this.courseForm.value.dateDechargement)
    formdata.append('dateChargementRetour',this.courseForm.value.dateChargementRetour)
    formdata.append('dateDechargementRetour',this.courseForm.value.dateDechargementRetour)
    // formdata.append('jourChargement',this.clientForm.value.jourChargement)
   // formdata.append('debut',this.courseForm.value.debut)
    //formdata.append('periode',JSON.stringify(this.contratForm.value.periode))
  //  formdata.append('fin',this.courseForm.value.fin)
    formdata.append('typeClient','Contractuel')
    formdata.append('tonnage',this.courseForm.value.tonnage)
    formdata.append('coutRetour',this.courseForm.value.coutRetour)
    formdata.append('cout',this.courseForm.value.cout)
    formdata.append('marchandise',this.courseForm.value.marchandise)
    this.courseService.addCourse(formdata).subscribe(
      (data: any) =>{
        this.loaderAdd = true;
        setInterval(function () {
          window.location.reload()
        },3000)
        console.log(data)
      },(error: any) => {
        this.loaderAdd = true;
        console.log(error)
      }
    )
  }
  setSelectedContrat(){
    this.selectedContrat = null;
    this.selectedCourse = null;
    for (const e of  this.client?.contrats) {
      if (  e.id == this.contratId){
        this.selectedContrat=e;
      }
    }

  }
  setTypeTra(type){
    if(type=='Aller2'){
      for (const e of  this.listItins) {
        if (  e.id == this.clientForm.value.itineraireAller){
          this.clientForm.patchValue({lieuChargement: e?.depart}) //value.lieuChargement = e?.depart;
          this.clientForm.patchValue({lieuDechargement: e?.arrivee})//value.lieuDechargement = e?.arrivee;
          this.clientForm.patchValue({dureeTrajet: e?.duree})//value.lieuDechargement = e?.arrivee;
        }
      }
    }else if(type=='Retour2'){
      for (const e of  this.listItins) {
        if (  e.id == this.clientForm.value.itineraireRetour){
          this.clientForm.patchValue({lieuChargementRetour: e?.depart})
          this.clientForm.patchValue({lieuDechargementRetour: e?.arrivee}) //value.lieuDechargementRetour = e?.arrivee;
          this.clientForm.patchValue({dureeTrajetRetour: e?.duree})//value.lieuDechargement = e?.arrivee;

        }
      }
    }else if(type=='AllerCourse'){
      for (const e of  this.listItins) {
        if (  e.id == this.courseForm.value.itineraireAller){
          this.courseForm.patchValue({lieuChargement: e?.depart})
          this.courseForm.patchValue({lieuDechargement: e?.arrivee}) //value.lieuDechargementRetour = e?.arrivee;
          this.courseForm.patchValue({dureeTrajet: e?.duree})//value.lieuDechargement = e?.arrivee;

        }
      }
    }else if(type=='RetourCourse'){
      for (const e of  this.listItins) {
        if (  e.id == this.courseForm.value.itineraireRetour){
          this.courseForm.patchValue({lieuChargementRetour: e?.depart});
          this.courseForm.patchValue({lieuDechargementRetour: e?.arrivee}) //value.lieuDechargementRetour = e?.arrivee;
          this.courseForm.patchValue({dureeTrajetRetour: e?.duree})//value.lieuDechargement = e?.arrivee;

        }
      }
    }else if(type=='AllerContrat'){
      for (const e of  this.listItins) {
        if (  e.id == this.contratForm.value.itineraireAller){
          this.contratForm.patchValue({lieuChargement: e?.depart})
          this.contratForm.patchValue({lieuDechargement: e?.arrivee}) //value.lieuDechargementRetour = e?.arrivee;
          this.contratForm.patchValue({dureeTrajet: e?.duree})//value.lieuDechargement = e?.arrivee;

        }
      }
    }else if(type=='RetourContrat'){
      for (const e of  this.listItins) {
        if (  e.id == this.contratForm.value.itineraireRetour){
          this.contratForm.patchValue({lieuChargementRetour: e?.depart});
          this.contratForm.patchValue({lieuDechargementRetour: e?.arrivee}) //value.lieuDechargementRetour = e?.arrivee;
          this.contratForm.patchValue({dureeTrajetRetour: e?.duree})//value.lieuDechargement = e?.arrivee;

        }
      }
    }

    console.log(  this.contratForm.value);
  }

  getTypeContrat(type){
    this.typeContrat = type == 'client'? this.clientForm.value.typeTrajet: this.contratForm.value.typeTrajet;
    if (this.typeContrat != 'Aller - Retour'){
      this.clientForm.value.lieuChargementRetour = '';
      this.clientForm.value.lieuDechargementRetour = '';
    }
   }
   getSelectedTonnage(type){
     let  form=''
    if(type == 'client'){
      form=this.clientForm.value.tonnage
    }else if (type == 'contrat'){
        form=this.contratForm.value.tonnage
    }else if (type == 'course'){
        form=this.courseForm.value.tonnage
    }
 //   const form=type == 'client' ?this.clientForm.value.tonnage :this.contratForm.value.tonnage
     this.listTypeCamionTonne.forEach((tc) => {
       if (tc.id == form) {
         if (type== 'client'){
           this.selectedTonnage = tc
           this.clientForm.value.cout = tc?.currentBareme?.cout
           this.clientForm.value.coutRetour = tc?.currentBareme?.cout
           const cout = document.getElementById('cout')
           const coutRetour = document.getElementById('coutRetour')
           // @ts-ignore
           cout.value =  tc?.currentBareme?.cout
           // @ts-ignore
           coutRetour.value =  tc?.currentBareme?.cout
         }else if(type == 'contrat'){
           this.selectedTonnage = tc
           this.contratForm.value.cout = tc?.currentBareme?.cout
           this.contratForm.value.coutRetour = tc?.currentBareme?.cout
           const cout = document.getElementById('coutContrat')
           const coutRetour = document.getElementById('coutRetourContrat')
           // @ts-ignore
           cout.value =  tc?.currentBareme?.cout
           // @ts-ignore
           coutRetour.value =  tc?.currentBareme?.cout
         }else if(type == 'course'){
           this.selectedTonnage = tc
           this.courseForm.value.cout = tc?.currentBareme?.cout
           this.courseForm.value.coutRetour = tc?.currentBareme?.cout
           const cout = document.getElementById('coutCourse')
           const coutRetour = document.getElementById('coutRetourCourse')
           // @ts-ignore
           cout.value =  tc?.currentBareme?.cout
           // @ts-ignore
           coutRetour.value =  tc?.currentBareme?.cout
         }

       }
     });

   }

   getTypeTrajetCourse(){
   this.typeContrat= this.courseForm.value.typeTrajet;
   }

  getClientFilter(){
    const body = '?tel='+this.courseForm.value.tel;
    this.clientService.getClientFilter(body).subscribe(
      data => {
        console.log(data)
        if (data['hydra:member']){
          if (data['hydra:member'][0]){
            this.clientToPlanCourse =data['hydra:member'][0]
            this.courseForm.value.tel =   this.clientToPlanCourse?.tel
            this.courseForm.value.nomComplet =   this.clientToPlanCourse?.nomComplet

          }
        }
      }
    )
  }
  savePayment(){
    this.loaderPay = true
    this.clientService.addPayment({clientId: this.id,contratId: this.selectedContrat.id,courseId: this.selectedCourse.id,paid: this.montantRestant}).subscribe(
      (data: any) => {
        this.selectedCourse.montantRestant = data?.montantCourseRestant
        this.client.montantRestant = data?.montantClientRestant
        this.loaderPay = false
        this.montantRestant = ''
        this.alertService.successDangerNotif('success','Paiement effectué avec succés')
        console.log(data);
      },(error) =>{
        this.loaderPay = false;
        this.alertService.successDangerNotif('success', 'Erreur lors du paiement')

        console.log(error);
    }
    );
  }


}
