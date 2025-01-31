import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { Store } from '@ngrx/store';
import { authActions } from '../../../features/authentication/application/auth.actions';
import { SIDE_MENU_ITEMS } from '../../domain/configs/side-menu.config';
import { SideMenuItem } from '../../domain/types/side-menu-item.type';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterLink,
    RouterOutlet,
    NgFor,
    NgIf,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzDropDownModule,
    NzButtonModule,
    NzSpaceModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  protected isCollapsed = false;
  protected sideMenuItems: SideMenuItem[] = SIDE_MENU_ITEMS;

  constructor(private readonly _store: Store) { }

  onLogout(): void {
    this._store.dispatch(authActions.logout());
  }

}
