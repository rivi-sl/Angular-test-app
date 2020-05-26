import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { MenuItemsOptions } from '../menuitemsoptions';
import { MenuItems } from '../menuitems';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items = MenuItems;
  selectedOption: MenuItemsOptions;

  onSelect(item: MenuItemsOptions): void {
    this.selectedOption = item;
  }

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.selectedOption = this.items[0];
  }

}
