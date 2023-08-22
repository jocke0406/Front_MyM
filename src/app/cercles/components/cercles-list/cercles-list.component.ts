import { Component, OnInit, OnDestroy } from '@angular/core';
import { CerclesService } from '../../services/cercles.service';
import { Cercle } from '../../models/cercle';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cercles-list',
  templateUrl: './cercles-list.component.html',
  styleUrls: ['./cercles-list.component.css']
})
export class CerclesListComponent implements OnInit, OnDestroy {

  public cerclesList!: Cercle[];
  private _unsubscribeAll = new Subject<void>();

  constructor(private _cerclesService: CerclesService) { };

  ngOnInit(): void {
    this._cerclesService.getCerclessAll()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (data) => {
          this.cerclesList = data.filter((cercle: Cercle) => !cercle.deletedAt);
          console.log(this.cerclesList);
        },
        error: (error) => {
          console.log(error);
        }
      }

      );
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
