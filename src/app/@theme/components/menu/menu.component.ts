import { Component, OnInit, AfterViewInit, OnDestroy, HostBinding, Input, Inject } from '@angular/core';
import { EpMenuItem, EpMenuInternalService, EpMenuBag } from '../menu-services/menu.service';
import { NB_WINDOW } from '@nebular/theme';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../@models/app-state';
import { convertToBoolProperty } from './menu-helper';
import { takeWhile, filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'ep-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit, OnDestroy {

  @HostBinding('class.inverse') inverseValue: boolean;
  /**
   * Tags a menu with some ID, can be later used in the menu service
   * to determine which menu triggered the action, if multiple menus exist on the page.
   *
   * @type {string}
   */
  @Input() tag: string;

  /**
   * List of menu items.
   * @type List<NbMenuItem> | List<any> | any
   */
  @Input() items: EpMenuItem[];

  /**
   * Makes colors inverse based on current theme
   * @type boolean
   */
  @Input()
  set inverse(val: boolean) {
    this.inverseValue = convertToBoolProperty(val);
  }

  private alive: boolean = true;
  private autoCollapseValue: boolean = false;
  constructor(@Inject(NB_WINDOW) private window,
              private router: Router,
              private store: Store<AppState>,
              private internalMenuService: EpMenuInternalService) { }

  private compareTag(tag: string): any {
    return !tag || tag === this.tag;
  }

  onAddItem(data: { tag: string; items: EpMenuItem[] }) {
    this.items.push(...data.items);

    this.internalMenuService.prepareItems(this.items);
    this.internalMenuService.updateSelection(this.items, this.tag, this.autoCollapseValue);
  }

  onHoverItem(item: EpMenuItem) {
    this.internalMenuService.itemHover(item, this.tag);
  }

  onSelectItem(item: EpMenuItem) {
    this.internalMenuService.resetItems(this.items);
    this.internalMenuService.selectItem(item, this.tag);
  }

  onItemClick(item: EpMenuItem) {
    this.internalMenuService.itemClick(item, this.tag);
  }

  private getSelectedItem(items: EpMenuItem[]): EpMenuItem {
    let selected = null;
    items.forEach((item: EpMenuItem) => {
      if (item.selected) {
        selected = item;
      }
      if (item.selected && item.children && item.children.length > 0) {
        selected = this.getSelectedItem(item.children);
      }
    });
    return selected;
  }

  ngOnInit() {
    this.internalMenuService
      .onAddItem()
      .pipe(
        takeWhile(() => this.alive),
        filter((data: { tag: string; items: EpMenuItem[] }) => this.compareTag(data.tag)),
      )
      .subscribe(data => this.onAddItem(data));
      this.internalMenuService
      .onGetSelectedItem()
      .pipe(
        takeWhile(() => this.alive),
        filter((data: { tag: string; listener: BehaviorSubject<EpMenuBag> }) => this.compareTag(data.tag)),
      )
      .subscribe((data: { tag: string; listener: BehaviorSubject<EpMenuBag> }) => {
        data.listener.next({ tag: this.tag, item: this.getSelectedItem(this.items) });
      });
      this.router.events
      .pipe(
        takeWhile(() => this.alive),
        filter(event => event instanceof NavigationEnd),
      )
      .subscribe(() => {
        this.internalMenuService.resetItems(this.items);
        this.internalMenuService.updateSelection(this.items, this.tag, this.autoCollapseValue)
      });

    // TODO: this probably won't work if you pass items dynamically into items input
    this.internalMenuService.prepareItems(this.items);
    this.items.push(...this.internalMenuService.getItems());
  }

  ngAfterViewInit() {
    // TODO - Handle the submenu
    setTimeout(() => this.internalMenuService.updateSelection(this.items, this.tag));
  }

  ngOnDestroy() {
  }


}
