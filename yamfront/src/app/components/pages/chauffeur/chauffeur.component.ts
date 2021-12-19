import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-chauffeur',
  templateUrl: './chauffeur.component.html',
  styleUrls: ['./chauffeur.component.scss']
})
export class ChauffeurComponent implements OnInit {
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
}
