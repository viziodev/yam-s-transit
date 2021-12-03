import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-content-menu',
  templateUrl: './content-menu.component.html',
  styleUrls: ['./content-menu.component.scss']
})
export class ContentMenuComponent implements OnInit {
  @Input() title: string;
  @Input() menus: any[];
  currentMenu: number;
  constructor() { }

  ngOnInit(): void {
    this.currentMenu = 0;
  }
  setCurrentMenu(pos){
    this.currentMenu = pos;
  }
}
