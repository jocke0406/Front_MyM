import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  public user!: User;
  private _unsubscribeAll = new Subject<void>();
  constructor(private _route: ActivatedRoute, private _usersService: UsersService) { }
  friendsList: string[] = [];

  ngOnInit(): void {
    this._route.params.pipe(
      switchMap(({ id }) => this._usersService.getUserFull(id)),
      takeUntil(this._unsubscribeAll)
    ).subscribe({
      next: (data) => {
        this.user = data;
        console.log(this.user);

      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getStudyYearLabel(year: number): string {
    if (year) {
      const yearMap: Record<number, string> = {
        1: 'Bachelier 1',
        2: 'Bachelier 2',
        3: 'Bachelier 3',
        4: 'Master 1',
        5: 'Master 2',
        6: 'Master 3',
        7: 'Doctorat',
        8: 'Diplomé',
      };
      return yearMap[year] || 'N/A';
    }

    return 'N/A';


  }

  isFriend(userId: string): boolean {
    return this.friendsList.includes(userId);
  }

  addFriend() {


  }

  removeFriend() {

  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
