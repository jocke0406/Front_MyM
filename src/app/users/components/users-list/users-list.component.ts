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

  paginatedUsersList: User[] = [];
  usersPerPage: number = 1;
  currentPage: number = 1;
  usersList: User[] = [];
  totalPages: number = 1;
  pagesArray: number[] = [];

  private _unsubscribeAll = new Subject<void>();

  constructor(private _usersService: UsersService) { }

  ngOnInit(): void {
    this._usersService.getUsersAll().pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (data) => {
        this.usersList = data
          .filter((user: User) => (user.deletedAt === null || !user.deletedAt));
        this.setupPagination();
      },
      error: (error) => {
        console.log("Une erreur s'est produite lors de la récupération des utilisateurs", error)
      }
    })
  }

  setupPagination() {
    this.totalPages = Math.ceil(this.usersList.length / this.usersPerPage);
    this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1); // génère un tableau [1, 2, ..., totalPages]
    this.updatePaginatedUsers();
  }


  updatePaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    this.paginatedUsersList = this.usersList.slice(startIndex, startIndex + this.usersPerPage);
  }


  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedUsers();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
