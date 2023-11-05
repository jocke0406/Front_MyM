import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';

declare var anime: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements AfterViewInit {

  constructor(private _el: ElementRef) { }

  ngAfterViewInit(): void {
    const parentElement = this._el.nativeElement.querySelector('.col');
    const parentWidth = parentElement.offsetWidth;
    console.log(this._el)
    anime({
      targets: '.col',
      translateX: parentWidth,
      duration: 800,
      easing: 'easeInOutSine'
    });
  }
}
