import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss']
})
export class ClientCardComponent implements OnInit {


  @Input() client : any;
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
    this.clickActionItem.emit({id:actionId,type:type,client: this.client});
  }

  clickedActionner(actionId) {
    this.isExpanded = !this.isExpanded;
    this.clickedAction.emit(actionId);
  }
}
