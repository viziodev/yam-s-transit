import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-camion',
  templateUrl: './camion.component.html',
  styleUrls: ['./camion.component.scss']
})
export class CamionComponent implements OnInit {
  menus: any[];
  modalTitle:string;
  size:string;
  selectChauffeur:boolean;
  menuOpen: boolean = false;
  @ViewChild('toggleButton') toggleButton: ElementRef;
  @ViewChild('chauffeursList') chauffeursList: ElementRef;

  constructor(private renderer: Renderer2) {
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
      }
    ]
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
}
