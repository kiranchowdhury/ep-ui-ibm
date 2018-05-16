import { Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChildren,
  ElementRef,
  PLATFORM_ID,
  Inject,
  ChangeDetectorRef,
  Input} from '@angular/core';
import { MenuService, EpMenuItem } from '../menu-services/menu.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[epMenuItem]',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  /** TODO - Change any to EPMenuItem */
  @Input() menuItem = <EpMenuItem>null;

  @Output() hoverItem = new EventEmitter();
  @Output() selectItem = new EventEmitter();
  @Output() itemClick = new EventEmitter();


  constructor(
    private menuService: MenuService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private changeDetection: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  onHoverItem(item: EpMenuItem) {
    this.hoverItem.emit(item);
  }

  onSelectItem(item: EpMenuItem) {
    this.selectItem.emit(item);
  }

  onItemClick(item: EpMenuItem) {
    this.selectItem.emit(item);
  }

}
