import { Component, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
    selector: 'carbon-snippet',
    template: `
    <div [class]="'bx--snippet bx--snippet--'+appearance">
        <div class="bx--snippet-container"><code><pre #snippet><ng-content></ng-content></pre></code></div>
        <textarea #textarea style="opacity:0;overflow:none;height:1px;width:1px;"></textarea>
        <button class="bx--snippet-button" aria-label="Copy code">
        <carbon-icon (click)="copyContent(snippet)" class="bx--snippet__icon" name="copy"></carbon-icon>
        <div [ngClass]="{'bx--btn--copy__feedback--displayed':isCopied}" class="bx--btn--copy__feedback" data-feedback="Copied!"></div>
    </button>
    </div>`
})
export class SnippetComponent {
    @Input() appearance = 'code';
    @ViewChild('textarea') textarea: ElementRef;
    isCopied = false;

    copyContent(snippetBox: ElementRef) {
        try {
            this.textarea.nativeElement.value = (<any>snippetBox).textContent;
            this.textarea.nativeElement.select();
            this.isCopied = document.execCommand('copy');
        } catch (e) {
            console.error(e);
        }

        setTimeout(() => this.isCopied = false, 5000);
    }

}
