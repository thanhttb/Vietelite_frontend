import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';

declare let mLayout: any;
@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    styleUrls: ["./header-nav.component.css"],
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {


    constructor() {

    }
    ngOnInit() {

    }
    ngAfterViewInit() {

        mLayout.initHeader();

    }

}