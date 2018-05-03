import { Component, Input, Output, OnInit, EventEmitter, HostBinding } from '@angular/core';

@Component({
    selector: 'carbon-notification',
    template: `
  <div [class]="'bx--'+appearance+'-notification__details'">
    <carbon-icon *ngIf="appearance==='inline'" [class]="'bx--'+appearance+'-notification__icon'" aria-label="close" [name]="iconName">
    </carbon-icon>
    <div [ngClass]="{'bx--inline-notification__text-wrapper':appearance==='inline','bx--toast-notification__details':appearance==='toast'}">
        <p [class]="'bx--'+appearance+'-notification__title'"><ng-content select=".title"></ng-content></p>
        <p [class]="'bx--'+appearance+'-notification__subtitle'"><ng-content select=".body"></ng-content></p>
        <p [class]="'bx--'+appearance+'-notification__caption'"><ng-content select=".caption"></ng-content></p>
    </div>
  </div>
  <button [class]="'bx--'+appearance+'-notification__close-button'" type="button" (click)="onCloseClick()">
    <carbon-icon [class]="'bx--'+appearance+'-notification__close-icon'" name="close"></carbon-icon>
  </button>`
})
export class NotificationComponent implements OnInit {
    @Input() appearance: string;
    @Input() type: string;
    @Output() onClose = new EventEmitter<void>();

    @HostBinding('class') className: string;
    @HostBinding('attr.role') role = 'alert';

    ngOnInit () {
        this.className = this.className || '';
        this.className += ` bx--${this.appearance}-notification bx--${this.appearance}-notification--${this.type}`;
    }

    get iconName () {
        return (this.type === 'success' ? 'checkmark' : this.type) + '--glyph';
    }

    onCloseClick() {
        this.onClose.emit();
    }
}
