import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-piece-card',
  templateUrl: './piece-card.component.html',
  styleUrls: ['./piece-card.component.scss']
})
export class PieceCardComponent implements OnInit {

  @Input() piece: any;
  @Input() cardId: any;
  ENDPOINT = environment.ENDPOINT;
  isSelected: boolean = false;
  @Output() clickedAction = new EventEmitter<any>();
  @Output() clickActionItem = new EventEmitter<any>();
  @Output() clickedToAppro = new EventEmitter<any>();
  @Input()  isExpanded: boolean =false;
  constructor() { }

  ngOnInit(): void {
  }
  clickedActionner(actionId) {
    this.isExpanded = !this.isExpanded;
    this.clickedAction.emit(actionId);
  }
  clickedActionItem(actionId,type) {
    this.isExpanded = false;
    this.clickActionItem.emit({id: actionId,type: type});
  }
  clickedCardAppro() {

    this.isSelected=   !this.isSelected;
    this.clickedToAppro.emit({id:this.cardId,type:this.isSelected == false?'let':'appro',piece: this.piece});
  }

}
