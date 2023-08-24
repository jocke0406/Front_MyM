import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {
  public usersList!: User[];
  private _unsubscribeAll = new Subject<void>();
  constructor(private _usersService: UsersService) { }
  ngOnInit(): void {
    this._usersService.getUsersAll().pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (data) => {
        this.usersList = data.filter((user: User) => !user.deletedAt);
        console.log(this.usersList);
      },
      error: (error) => {
        console.log("une erreur s est produite lors de la récupération des events", error)
      }
    })
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
