import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../entities/Item';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input() item!: Item;

  constructor() { }

  ngOnInit(): void {
  }

}
