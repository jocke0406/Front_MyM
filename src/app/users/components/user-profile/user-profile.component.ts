import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { takeUntil, switchMap, map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, combineLatest, forkJoin, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Event } from 'src/app/events/models/event';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  friendsList: string[] = [];
  currentUserId?: string;
  user?: User;
  userSelectedId?: string;
  friendStatus$ = new BehaviorSubject<boolean>(false);
  userFriends$: Observable<User[]> = of([]);
  userEvents: Event[] = [];
  showFriends = false;
  showEvents = false;
  private _unsubscribeAll = new Subject<void>();

  constructor(private _route: ActivatedRoute, private _usersService: UsersService,
    private _auth: AuthService) { }


  ngOnInit(): void {
    combineLatest([
      this._route.params,
      this._auth.userConnectedId$
    ]).pipe(
      switchMap(([params, userConnectedId]) => {
        this.userSelectedId = params['id'];

        this.currentUserId = userConnectedId!;
        return forkJoin({
          user: this._usersService.getUserFull(this.userSelectedId!),
          friends: this._usersService.getUserFriends(userConnectedId!),

        });
      }),
      map(({ user, friends }) => {
        this.friendsList = friends.map(friend => friend._id);
        const isFriend = this.friendsList.includes(this.userSelectedId!);
        this.friendStatus$.next(isFriend);
        return { user, isFriend };
      }), takeUntil(this._unsubscribeAll)
    ).subscribe(
      {
        next: ({ user, isFriend }) => {
          this.user = user;
          this.user.isFriend = isFriend;
        },
        error: (error) => {
          console.error("Oups, une petite erreur est survenue!", error);
        }
      }
    )
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
    console.log(this.currentUserId!, this.userSelectedId!)
    this._usersService.addFriend(this.currentUserId!, this.userSelectedId!)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: updateUser => {
          this.user!.isFriend = true;
          this.friendStatus$.next(true);
          if (this.user!.friends) {
            this.user!.friends.push(this.userSelectedId!);
          } else {
            this.user!.friends = [this.userSelectedId!];
          }
        },
        error: (error) => {
          console.error("Oups, une petite erreur est survenue!", error);
        }
      })
  }

  removeFriend() {
    this._usersService.removeFriend(this.currentUserId!, this.userSelectedId!)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: updateUser => {
          this.user!.isFriend = false;
          this.friendStatus$.next(false);
          if (this.user!.friends) {
            const index = this.user!.friends.indexOf(this.userSelectedId!);
            if (index > -1) {
              this.user!.friends.splice(index, 1);
            }
          }
        },

        error: (error) => {
          console.error("Oups, une petite erreur est survenue lors de la tentative de suppression d'un ami!", error);
        }
      })
  }

  toggleFriends(): void {
    if (!this.showFriends) {
      this.userFriends$ = this._usersService.getUserFriends(this.userSelectedId!);
    }
    this.showFriends = !this.showFriends;
    this.showEvents = false;

  }

  toggleEvents(): void {
    if (!this.showEvents) {
      const currentDate = new Date();
      this._usersService.getUserEvents(this.userSelectedId!)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe({
          next: (response) => {
            const eventsArray = response.userEvents;
            this.userEvents = eventsArray
              .filter((event: Event) => !event.deletedAt)
              .filter((event: Event) => new Date(event.startAt) >= currentDate)
              .sort((a: Event, b: Event) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
              .map((event: Event) => {
                return {
                  ...event,
                };
              });
          },
          error: (error) => {
            console.error(error);
          }
        });
    }
    this.showEvents = !this.showEvents;
    this.showFriends = false;
  }


  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
