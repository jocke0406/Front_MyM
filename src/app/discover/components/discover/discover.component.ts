import { Location as AngularLocation } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Cercle } from 'src/app/cercles/models/cercle';
import { Event } from 'src/app/events/models/event';
import { User } from 'src/app/users/models/user';
import { CerclesService } from '../../../cercles/services/cercles.service';
import { EventsService } from '../../../events/services/events.service';
import { UsersService } from '../../../users/services/users.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css'],
})
export class DiscoverComponent implements OnInit, OnDestroy {
  private _unsubscribeAll = new Subject<void>();

  showUsers: boolean = false;
  showEvents: boolean = false;
  showCercles: boolean = false;
  userSearchForm!: FormGroup;
  eventSearchForm!: FormGroup;
  cercleSearchForm!: FormGroup;
  users!: User[];
  events!: Event[];
  cercles!: Cercle[];
  filteredUsers: User[] = [];
  filteredEvents: Event[] = [];
  filteredCercles: Cercle[] = [];
  topUsers: User[] = [];
  nextEvents: Event[] = [];
  topCercles: Cercle[] = [];

  constructor(
    private _fb: FormBuilder,
    private _userstService: UsersService,
    private _eventsService: EventsService,
    private _cerclesService: CerclesService,
    private _location: AngularLocation
  ) { }

  ngOnInit(): void {
    this.userSearchForm = this._fb.group({
      query: [''],
    });
    this.eventSearchForm = this._fb.group({
      query: [''],
    });
    this.cercleSearchForm = this._fb.group({
      query: [''],
    });
  }

  toggleUsers() {
    this.showUsers = !this.showUsers;
    if (this.showUsers && !this.users) {
      this.loadUsers();
    } else if (!this.showUsers) {
      this.userSearchForm.reset();
      this.filteredUsers = [];
    }
  }

  toggleEvents() {
    this.showEvents = !this.showEvents;
    if (this.showEvents && !this.events) {
      this.loadEvents();
    } else if (!this.showEvents) {
      this.eventSearchForm.reset();
      this.filteredEvents = [];
    }
  }

  toggleCercles() {
    this.showCercles = !this.showCercles;
    if (this.showCercles && !this.cercles) {
      this.loadCercles();
    } else if (!this.showCercles) {
      this.cercleSearchForm.reset();
      this.filteredCercles = [];
    }
  }

  loadUsers() {
    this._userstService
      .getUsersAll()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        this.users = data.filter(
          (user) => user.deletedAt === null || user.deletedAt === undefined
        );
        this.topUsers = [...this.users]
          .sort((a, b) => b.friends.length - a.friends.length)
          .slice(0, 3);
      });
  }

  loadEvents() {
    this._eventsService
      .getEventsAll()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        this.events = data.filter(
          (event) =>
            new Date(event.startAt) >= new Date() &&
            (event.deletedAt === null || event.deletedAt === undefined)
        );

        this.nextEvents = [...this.events]
          .sort(
            (a, b) =>
              new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
          )
          .slice(0, 3);
      });
  }

  loadCercles() {
    this._cerclesService
      .getCerclessAll()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        this.cercles = data.filter(
          (cercle) =>
            cercle.deletedAt === null || cercle.deletedAt === undefined
        );
        this.topCercles = [...this.cercles]
          .sort((a, b) => b.members_ids.length - a.members_ids.length)
          .slice(0, 3);
      });
  }

  performUserSearch() {
    const query = this.userSearchForm.value.query.toLowerCase();
    this.filteredUsers = this.users.filter(
      (user) =>
        user.pseudo.toLowerCase().includes(query) ||
        user.name.first.toLowerCase().includes(query) ||
        user.name.last.toLowerCase().includes(query)
    );
  }

  performEventSearch() {
    const query = this.eventSearchForm.value.query.toLowerCase();
    this.filteredEvents = this.events.filter((event) =>
      event.name.toLowerCase().includes(query)
    );
  }

  performCercleSearch() {
    const query = this.cercleSearchForm.value.query.toLowerCase();
    this.filteredCercles = this.cercles.filter((cercle) =>
      cercle.name.toLowerCase().includes(query)
    );
    console.log(this.filteredEvents);
  }
  goBack() {
    this._location.back();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
