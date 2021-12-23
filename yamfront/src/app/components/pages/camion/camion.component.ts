import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ParamsService} from "../../../services/api/params-service";
import {CamionService} from "../../../services/api/camion.service";

@Component({
  selector: 'app-camion',
  templateUrl: './camion.component.html',
  styleUrls: ['./camion.component.scss']
})
export class CamionComponent implements OnInit {
  menus: any[];
  listTypesCamions: any[];
  listMarques: any[];
  listModeles: any[];
  listChauffeursPrin: any[];
  listChauffeursSecon: any[];
  modalTitle:string;
  size:string;
  selectedTypeCamion:any;
  selectedModeleCamion:any;
  selectChauffeur:boolean;
  camionForm:FormData;
  camionDetailsForm:FormGroup;
  imgURL='./assets/images/placeholder.png';
  private camionImg: any;
  menuOpen: boolean = false;
  @ViewChild('toggleButton') toggleButton: ElementRef;
  @ViewChild('chauffeursList') chauffeursList: ElementRef;

  constructor(private renderer: Renderer2,private fb: FormBuilder,private paramsService: ParamsService,private camionService: CamionService) {
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
    this.camionForm.delete('type');
    this.camionForm.append(type, e.target.files[0])
    console.log( this.camionForm)
}
onSelectTypeCamion(){
  for (const tc of this.listTypesCamions) {
    if(tc.id == this.camionDetailsForm.value.typeCamion){
      this.selectedTypeCamion = tc;
    }
  }

}
  onSelectModeleCamion(){
  for (const mod of this.listModeles) {
    if(mod.id == this.camionDetailsForm.value.modeleCamion){
      this.selectedModeleCamion = mod;
    }
  }

}
postCamion(){
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
    this.camionForm.append('camionImg',this.camionImg)
  this.camionService.addCamion(this.camionForm).subscribe(
    data => {
      console.log(data)
    }
  )
}
}
