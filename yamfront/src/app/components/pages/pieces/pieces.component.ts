import { Component, OnInit } from '@angular/core';
import {PiecesService} from "../../../services/api/pieces.service";

@Component({
  selector: 'app-pieces',
  templateUrl: './pieces.component.html',
  styleUrls: ['./pieces.component.scss']
})
export class PiecesComponent implements OnInit {
  menus: any[];
  tabPieces: any[]=[];
  modalTitle:string;
  size:string;
  loaderList: boolean = false;
  expandedAppro: boolean = false;
  loaderDetails: boolean = false;
  approSelection: any[]=[];

  constructor(private piecesService: PiecesService) { }

  ngOnInit(): void {
    this.menus = [  {
      title: 'Stock de pieces',
      url: 'Pages',
    },  {
      title: 'Statistiques',
      url: 'Pages',
    }
    ];
    this.piecesService.listPieces().subscribe(
      (data: any) => {
        if (data?.data.length > 0){
          for (const datum of data?.data) {
            this.tabPieces.push(datum);
          }
        }
      }
    );
  }
  addPiece(){
    this.modalTitle = 'Ajout d\' une piece';
    this.size = 'moitie';
  }
  detailsPiece(){
    this.modalTitle='Details d\' une piece';
    this.size="complet";
  }

  getAppro(e){
    let pos = null;
    if(e.type == 'appro'){
      this.approSelection.push(e)
    }else {
      for (let i = 0; i <   this.approSelection.length; i++) {
        if (  this.approSelection[i].id == e.id){
          pos  = i;
        }
      }
      if (pos != null){
        this.approSelection.splice(pos,1);
      }
    }
    console.log(  this.approSelection)
    const detailsAppro = document.getElementById('detailsAppro');
    const listPieces = document.getElementById('listPieces');

    listPieces.classList.remove('col-12');
    listPieces.classList.remove('col-9');
    listPieces.classList.remove('col-6');
    if (detailsAppro){
      detailsAppro.classList.remove('col-3');
      detailsAppro.classList.remove('col-6');
    }


    if (this.approSelection.length>0){

      if (this.expandedAppro == true){
        listPieces.classList.add('col-6');
        detailsAppro.classList.add('col-6');
      }else {
         listPieces.classList.add('col-9');
        if (detailsAppro){
          detailsAppro.classList.add('col-3');
        }
      }


    }else {
      listPieces.classList.add('col-12');
    }



  }

  expandDiv(){
    const detailsAppro = document.getElementById('detailsAppro');
    const listPieces = document.getElementById('listPieces');
    this.expandedAppro = ! this.expandedAppro;

    if (this.expandedAppro == true){
      listPieces.classList.remove('col-12');
      listPieces.classList.remove('col-9');
      listPieces.classList.remove('col-6');
      listPieces.classList.add('col-6');

      listPieces.classList.add('col-6');

    //  listPieces.classList.remove('col-12');
      detailsAppro.classList.remove('col-3');
      detailsAppro.classList.add('col-6');
    }else {
      detailsAppro.classList.add('col-3');
      detailsAppro.classList.remove('col-6');
      listPieces.classList.remove('col-6');
      listPieces.classList.add('col-9');
    }

  }
}
