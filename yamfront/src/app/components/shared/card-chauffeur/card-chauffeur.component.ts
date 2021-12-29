import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-card-chauffeur',
  templateUrl: './card-chauffeur.component.html',
  styleUrls: ['./card-chauffeur.component.scss']
})
export class CardChauffeurComponent implements OnInit {

  @Input() chauffeur : any;
  @Input() cardId: any;
  @Input()  isExpanded: boolean =false;
  @Output() clickedAction = new EventEmitter<any>();
  @Output() clickActionItem = new EventEmitter<any>();
  ENDPOINT = environment.ENDPOINT;
  constructor() { }

  ngOnInit(): void {
  }
  clickedActionItem(actionId,type) {
    this.isExpanded = false;
    this.clickActionItem.emit({id:actionId,type:type});
  }

  clickedActionner(actionId) {
     this.isExpanded = !this.isExpanded;
     this.clickedAction.emit(actionId);
  }
}
