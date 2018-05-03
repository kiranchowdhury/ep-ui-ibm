import { Component, Input, HostListener, OnInit } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
    selector: 'carbon-modal',
    template: `
    <div class="bx--modal" [ngClass]="{'is-visible': isOpen}" tabindex="-1">
      <div class="bx--modal-container">
        <div class="bx--modal-header">
          <h2 class="bx--modal-header__heading" i18n>{{modalTitle}}</h2>
          <button class="bx--modal-close" type="button" (click)="close()">
              <carbon-icon class="bx--modal-close__icon" name="close"></carbon-icon>
            </button>
        </div>

        <div class="bx--modal-content">
          <ng-content select="[modal-body]"></ng-content>
        </div>

        <div class="bx--modal-footer">
          <ng-content select="[modal-footer]"></ng-content>
        </div>
      </div>
    </div>
`
})
export class ModalComponent implements OnInit {
    @Input() modalId: string;
    @Input() modalTitle: string;
    @Input() blocking = false;
    isOpen = false;


    /**
     * Close modal when pressing ESC.
     */
    @HostListener('document:keydown', ['$event'])
    keyboardInput(event: KeyboardEvent) {
        this.keyup(event);
    }

    constructor(private modalService: ModalService) {
    }

    ngOnInit() {
        this.modalService.registerModal(this);
    }

    close(): void {
        this.modalService.close(this.modalId);
    }

    private keyup(event: KeyboardEvent): void {
        if (event.keyCode === 27) {
            this.modalService.close(this.modalId);
        }
    }
}
