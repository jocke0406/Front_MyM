import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/users/models/user';
import { UsersService } from 'src/app/users/services/users.service';



@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit, OnDestroy {
  usersList!: User[];
  private _unsubscribeAll = new Subject<void>();

  constructor(private _usersService: UsersService, private _messageService: MessageService) { }

  ngOnInit(): void {
    this._usersService.getUsersAll().pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (data) => {
          this.usersList = data.filter((user: User) => !user.deletedAt);
        },
        error: (error) => {
          console.log("Erreur lors du chargement des users :", error);
        }
      });
  }

  deleteUser(userId: string): void {
    this._usersService.deleteUser(userId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: () => {
          this._messageService.add({ severity: 'success', summary: 'Succès', detail: 'User supprimé avec succès' });
          this.refreshUsers();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du user, détails :', error);
          this._messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur s\'est produite lors de la suppression du User' });
        }
      });
  }

  refreshUsers(): void {
    this._usersService.getUsersAll()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (users: User[]) => {
          this.usersList = users.filter(user => !user.deletedAt);
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des users, détails:', error);
          this._messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur s\'est produite lors de la mise à jour de la liste' });

        }
      });
  }
  sortUsersByPseudo(): void {
    this.usersList.sort((a, b) => {
      if (a.pseudo < b.pseudo) {
        return -1;
      }
      if (a.pseudo > b.pseudo) {
        return 1;
      }
      return 0;
    })
  }
  sortUsersByName(): void {
    this.usersList.sort((a, b) => {
      if (a.name?.last && b.name?.last && a.name?.last < b.name?.last) {
        return -1;
      }
      if (a.name?.last && b.name?.last && a.name?.last > b.name?.last) {
        return 1;
      }
      return 0;
    })
  }
  sortUsersByFirst(): void {
    this.usersList.sort((a, b) => {
      if (a.name?.first && b.name?.first && a.name?.first < b.name?.first) {
        return -1;
      }
      if (a.name?.first && b.name?.first && a.name?.first > b.name?.first) {
        return 1;
      }
      return 0;
    })
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
