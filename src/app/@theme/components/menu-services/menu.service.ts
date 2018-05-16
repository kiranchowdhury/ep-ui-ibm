import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import { Location } from '@angular/common';
import { share } from 'rxjs/operators';
import { isUrlPathEqual, isUrlPathContain } from './url-helper';


export interface EpMenuBag { tag: string; item: EpMenuItem }

/** CONSTs */
const itemClick$ = new ReplaySubject<EpMenuBag>(1);
const addItems$ = new ReplaySubject<{ tag: string; items: EpMenuItem[] }>(1);
const navigateHome$ = new ReplaySubject<{ tag: string }>(1);
const getSelectedItem$
  = new ReplaySubject<{ tag: string; listener: BehaviorSubject<EpMenuBag> }>(1);
const itemSelect$ = new ReplaySubject<EpMenuBag>(1);
const itemHover$ = new ReplaySubject<EpMenuBag>(1);
const submenuToggle$ = new ReplaySubject<EpMenuBag>(1);

@Injectable()
export class MenuService {

  constructor() { }
  /**
   * Add items to the end of the menu items list
   * @param {List<EpMenuItem>} items
   * @param {string} tag
   */
  addItems(items: EpMenuItem[], tag?: string) {
    addItems$.next({ tag, items });
  }

  /**
   * Navigate to the home menu item
   * @param {string} tag
   */
  navigateHome(tag?: string) {
    navigateHome$.next({ tag });
  }

  /**
   * Returns currently selected item. Won't subscribe to the future events.
   * @param {string} tag
   * @returns {Observable<{tag: string; item: EpMenuItem}>}
   */
  getSelectedItem(tag?: string): Observable<EpMenuBag> {
    const listener = new BehaviorSubject<EpMenuBag>(null);

    getSelectedItem$.next({ tag, listener });

    return listener.asObservable();
  }

  onItemClick(): Observable<EpMenuBag> {
    return itemClick$.pipe(share());
  }

  onItemSelect(): Observable<EpMenuBag> {
    return itemSelect$.pipe(share());
  }

  onItemHover(): Observable<EpMenuBag> {
    return itemHover$.pipe(share());
  }

  onSubmenuToggle(): Observable<EpMenuBag> {
    return submenuToggle$.pipe(share());
  }
}

@Injectable()
export class EpMenuInternalService {
  private items: EpMenuItem[] = [];

  constructor(private location: Location) {
    this.items = [];
  }

  getItems(): EpMenuItem[] {
    return this.items;
  }

  prepareItems(items: EpMenuItem[]) {
    const defaultItem = new EpMenuItem();
    items.forEach(i => {
      this.applyDefaults(i, defaultItem);
      this.setParent(i);
    })
  }

  updateSelection(items: EpMenuItem[], tag: string, collapseOther: boolean = false) {
    if (collapseOther) {
      this.collapseAll(items, tag);
    }
    items.forEach(item => this.selectItemByUrl(item, tag));
  }

  resetItems(items: EpMenuItem[]) {
    items.forEach(i => this.resetItem(i));
  }

  collapseAll(items: EpMenuItem[], tag: string, except?: EpMenuItem) {
    items.forEach(i => this.collapseItem(i, tag, except));
  }
  onAddItem(): Observable<{ tag: string; items: EpMenuItem[] }> {
    return addItems$.pipe(share());
  }
  onNavigateHome(): Observable<{ tag: string }> {
    return navigateHome$.pipe(share());
  }
  onGetSelectedItem(): Observable<{ tag: string; listener: BehaviorSubject<EpMenuBag> }> {
    return getSelectedItem$.pipe(share());
  }
  itemHover(item: EpMenuItem, tag?: string) {
    itemHover$.next({tag, item});
  }
  submenuToggle(item: EpMenuItem, tag?: string) {
    submenuToggle$.next({tag, item});
  }
  itemSelect(item: EpMenuItem, tag?: string) {
    itemSelect$.next({tag, item});
  }
  itemClick(item: EpMenuItem, tag?: string) {
    itemClick$.next({tag, item});
  }
  private resetItem(item: EpMenuItem) {
    item.selected = false;

    item.children && item.children.forEach(child => {
      this.resetItem(child);
    });
  }
  private isParent(parent, child) {
    return child.parent
      ? child.parent === parent || this.isParent(parent, child.parent)
      : false;
  }
  private collapseItem(item: EpMenuItem, tag: string, except?: EpMenuItem) {
    if (except && (item === except || this.isParent(item, except))) {
      return;
    }

    const wasExpanded = item.expanded;
    item.expanded = false;
    if (wasExpanded) {
      this.submenuToggle(item);
    }

    item.children && item.children.forEach(child => this.collapseItem(child, tag));
  }
  private applyDefaults(item, defaultItem) {
    const menuItem = {...item};
    Object.assign(item, defaultItem, menuItem);
    item.children && item.children.forEach(child => {
      this.applyDefaults(child, defaultItem);
    })
  }
  private setParent(item: EpMenuItem) {
    item.children && item.children.forEach(child => {
      child.parent = item;
      this.setParent(child);
    });
  }
  selectItem(item: EpMenuItem, tag: string) {
    item.selected = true;
    this.itemSelect(item, tag);
    this.selectParent(item, tag);
  }
  private selectParent({ parent: item }: EpMenuItem, tag: string) {
    if (!item) {
      return;
    }

    if (!item.expanded) {
      item.expanded = true;
      this.submenuToggle(item, tag);
    }

    item.selected = true;
    this.selectParent(item, tag);
  }
  private selectItemByUrl(item: EpMenuItem, tag: string) {
    const wasSelected = item.selected;
    const isSelected = this.selectedInUrl(item);
    if (!wasSelected && isSelected) {
      this.selectItem(item, tag);
    }
    if (item.children) {
      this.updateSelection(item.children, tag);
    }
  }
  private selectedInUrl(item: EpMenuItem): boolean {
    const exact: boolean = item.pathMatch === 'full';
    return exact
      ? isUrlPathEqual(this.location.path(), item.link)
      : isUrlPathContain(this.location.path(), item.link);
  }
}

/** Define the menu item options -- the menu data structure */
export class EpMenuItem {
  /**
   * Item Title
   * @type {string}
   */
  title: string;
  /**
   * Item relative link (for routerLink)
   * @type {string}
   */
  link?: string;
  /**
   * Icon class name
   * @type {string}
   */
  icon?: string;
  /**
   * Expanded by defaul
   * @type {boolean}
   */
  expanded?: boolean;
  /**
   * Children items
   * @type {List<EpMenuItem>}
   */
  children?: EpMenuItem[];
  /**
   * Children items height
   * @type {number}
   */
  subMenuHeight?: number = 0;
  /**
   * HTML Link target
   * @type {string}
   */
  target?: string;
  /**
   * Hidden Item
   * @type {boolean}
   */
  hidden?: boolean;
  /**
   * Item is selected when partly or fully equal to the current url
   * @type {string}
   */
  pathMatch?: string = 'full';
  /**
   * Where this is a home item
   * @type {boolean}
   */
  home?: boolean;

  /** Map of query parameters
   *@type {Params}
   */
  queryParams?: Params;
  parent?: EpMenuItem;
  selected?: boolean;
  data?: any;
  fragment?: string;
}
