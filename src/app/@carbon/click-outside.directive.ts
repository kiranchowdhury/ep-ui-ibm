import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {
    @Output() public clickOutside = new EventEmitter<MouseEvent>();

    constructor(
        private el: ElementRef
    ) {}

    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {
        if (!targetElement) {
            return;
        }

        if (!this.el.nativeElement.contains(targetElement)) {
            this.clickOutside.emit(event);
        }
    }
}
