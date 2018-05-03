import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as _ from 'lodash';

import * as icons from 'carbon-icons';

@Component({
    selector: 'carbon-icon',
    template: '<svg [attr.class]="bxClass" [attr.height]="icon?.height" [attr.width]="icon?.width" \
    [attr.viewBox]="icon?.viewBox" [innerHTML]="iconContent"></svg>'
})
export class IconComponent implements OnInit {
    @Input('class') bxClass: string;
    @Input() name: string;
    @HostBinding('class') className: string;

    icon: any;
    iconContent: SafeHtml;

    constructor (
        private domSanitizer: DomSanitizer
    ) { }

    ngOnInit () {
        this.icon = <any>_.find(icons, iconObj => (<any>iconObj).id.indexOf(this.name) > -1);
        let svgHtml = '';

        Object.keys(this.icon.svgData)
            .filter(key => this.icon.svgData[key])
            .forEach(svgProp => {
                const svgTag = svgProp.substring(0, svgProp.length - 1);
                this.icon.svgData[svgProp].forEach(prop => {
                    svgHtml += `<${svgTag} `;
                    Object.keys(prop).forEach(propName => {
                        svgHtml += `${propName}="${prop[propName]}" `
                    });
                    svgHtml += `></${svgTag}>`;
                });
            });

        this.iconContent = this.domSanitizer.bypassSecurityTrustHtml(svgHtml);
        // remove the class from this component dom, because it goes onto the SVG
        this.className = '';
    }
}
