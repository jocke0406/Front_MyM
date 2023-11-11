import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  paginatedUsersList: User[] = [];
  usersPerPage = 5;
  currentPage = 1;
  usersList!: User[];
  totalPages = 1;
  pagesArray: number[] = [];

  currentUserId?: string;

  private _unsubscribeAll = new Subject<void>();

  constructor(
    private _usersService: UsersService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this._auth.userConnectedId$,
      this._usersService.getUsersAll(),
    ])
      .pipe(
        filter(([userConnectedId, _]) => !!userConnectedId),
        switchMap(([userConnectedId, users]) => {
          return this._usersService
            .getUserFriends(userConnectedId!)
            .pipe(map((friends) => [userConnectedId, users, friends]));
        }),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe({
        next: (results: (string | User[] | null)[]) => {
          if (results.length !== 3) {
            console.error('Mauvais format de données reçu!');
            return;
          }

          this.currentUserId = results[0] as string;
          const users = results[1] as User[];
          const friends = results[2] as User[];

          if (!this.currentUserId || !users || !friends) {
            console.error('Des données sont manquantes!');
            return;
          }

          const friendsIds = friends.map((friend) => friend._id);
          this.usersList = users
            .filter((user) => user.deletedAt === null || !user.deletedAt)
            .map((user) => {
              return {
                ...user,
                isFriend: friendsIds.includes(user._id),
              };
            });

          this.setupPagination();
        },
        error: (error: any) => {
          console.log(
            "Une erreur s'est produite lors de la récupération des données",
            error
          );
        },
      });
  }

  setupPagination() {
    this.totalPages = Math.ceil(this.usersList.length / this.usersPerPage);
    this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePaginatedUsers();
  }

  updatePaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    const endIndex = startIndex + this.usersPerPage;
    const paginatedList = this.usersList.slice(startIndex, endIndex);
    this.paginatedUsersList = this.sortUsersByFriendCount(paginatedList);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedUsers();
  }

  getVisiblePages(): number[] {
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, this.currentPage + 2);
    return Array(endPage - startPage + 1)
      .fill(0)
      .map((_, idx) => startPage + idx);
  }

  years: any[] = [
    { label: 'Bachelier 1', value: '1' },
    { label: 'Bachelier 2', value: '2' },
    { label: 'Bachelier 3', value: '3' },
    { label: 'Master 1', value: '4' },
    { label: 'Master 2', value: '5' },
    { label: 'Master 3', value: '6' },
    { label: 'Doctorat', value: '7' },
    { label: 'Diplomé', value: '8' },
  ];

  getYearLabel(value?: number): string {
    if (!value) return 'N/A';
    const yearObj = this.years.find((year) => year.value === value.toString());
    return yearObj ? yearObj.label : 'N/A';
  }

  sortUsersByFriendCount(users: User[]): User[] {
    return users.sort((a, b) => {
      const aFriendsCount = a.friends ? a.friends.length : 0;
      const bFriendsCount = b.friends ? b.friends.length : 0;
      return bFriendsCount - aFriendsCount;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
