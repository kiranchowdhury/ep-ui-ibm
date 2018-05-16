import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';

import { StateService } from '../../../@core/data/state.service';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/delay';
import { Store } from '@ngrx/store';
import { AppState } from '../../../@models/app-state';
import { EpMenuItem } from '../../components/menu-services/menu.service';

// TODO: move layouts into the framework
@Component({
  selector: 'ngx-sample-layout',
  styleUrls: ['./sample.layout.scss'],
  template: `
    <nb-layout [center]="layout.id === 'center-column'" windowMode>

      <nb-layout-header *ngIf="authenticated && authorized" fixed>
     <!-- <ep-menu [items]="menu"></ep-menu> -->

      <ngx-header [position]="sidebar.id === 'left' ? 'normal': 'inverse'" [menu]="menu"></ngx-header>
      </nb-layout-header>
      <!-- <nb-sidebar *ngIf="authenticated && authorized" class="menu-sidebar"
      tag="menu-sidebar"
      responsive
      [right]="sidebar.id === 'right'">
          <ng-content select="ep-menu"></ng-content>
      </nb-sidebar> -->
      <nb-layout-column class="main-content">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
      <nb-layout-column left class="small" *ngIf="layout.id === 'two-column' || layout.id === 'three-column'">
        <nb-menu [items]="subMenu"></nb-menu>
      </nb-layout-column>

      <nb-layout-column right class="small" *ngIf="layout.id === 'three-column'">
        <nb-menu [items]="subMenu"></nb-menu>
      </nb-layout-column>

      <nb-sidebar class="settings-sidebar"
                   tag="settings-sidebar"
                   state="collapsed"
                   fixed
                   [right]="sidebar.id !== 'right'">
        <ngx-theme-settings></ngx-theme-settings>
      </nb-sidebar>
    </nb-layout>
  `,
})
export class SampleLayoutComponent  implements OnInit, OnDestroy {

  @Input() authorized: boolean;
  @Input() authenticated: boolean;
  @Input() menu: EpMenuItem[]

  subMenu: NbMenuItem[] = [
  ];
  layout: any = {};
  sidebar: any = {};

  protected layoutState$: Subscription;
  protected sidebarState$: Subscription;
  protected menuClick$: Subscription;


  constructor(
              private store: Store<AppState>,
              protected stateService: StateService,
              protected menuService: NbMenuService,
              protected themeService: NbThemeService,
              protected bpService: NbMediaBreakpointsService,
              protected sidebarService: NbSidebarService) {
    this.layoutState$ = this.stateService.onLayoutState()
      .subscribe((layout: string) => this.layout = layout);

    this.sidebarState$ = this.stateService.onSidebarState()
      .subscribe((sidebar: string) => {
        this.sidebar = sidebar;
      });

    const isBp = this.bpService.getByName('is');
    this.menuClick$ = this.menuService.onItemSelect()
      .withLatestFrom(this.themeService.onMediaQueryChange())
      .delay(20)
      .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {

        if (bpTo.width <= isBp.width) {
          this.sidebarService.collapse('menu-sidebar');
        }
      });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.layoutState$.unsubscribe();
    this.sidebarState$.unsubscribe();
    this.menuClick$.unsubscribe();
  }
}
