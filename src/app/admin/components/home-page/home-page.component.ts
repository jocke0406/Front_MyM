import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

declare const anime: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements AfterViewInit, OnInit, OnDestroy {
  private _unsubscribeAll = new Subject<void>();
  isConnected = false;
  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    this._auth.userConnected$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((state: boolean) => {
        this.isConnected = state;
      });
  }
  ngAfterViewInit(): void {
    const words = document.querySelectorAll('.word');
    anime({
      targets: words[0],
      translateY: [100, -250],
      rotateZ: [-180, 360],
      opacity: [0, 1],
      scale: [0, 2],
      easing: 'easeInOutQuad',
      duration: 4000,
      color: '#ffc107'
    });

    anime({
      targets: words[1],
      translateY: [0, -150],
      rotateZ: [180, 360],
      opacity: [0, 1],
      scale: [0, 1.5],
      easing: 'easeInOutQuad',
      duration: 4000,
      color: '#28a745'

    });

    anime({
      targets: words[2],
      translateY: [-200, -50],
      rotateZ: [-720, 720],
      opacity: [0, 1],
      scale: [0, 2],
      easing: 'easeInOutQuad',
      duration: 4000,
      color: '#ffc107'

    });


  }

  logout(): void {
    this._auth.logout();
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
