import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() camion: any;
  @Input() cardId: any;
  ENDPOINT = environment.ENDPOINT;
  isSelected: boolean = false;
  @Output() clickedAction = new EventEmitter<any>();
  @Output() clickActionItem = new EventEmitter<any>();
  @Output() clickedToDelete = new EventEmitter<any>();
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
    this.clickActionItem.emit({id:actionId,type:type});
  }
  clickedCardDelete() {

    this.isSelected=   !this.isSelected;
     this.clickedToDelete.emit({id:this.cardId,type:this.isSelected == false?'let':'delete'});
  }
}
