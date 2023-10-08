import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../users/services/users.service';
import { CerclesService } from '../../../cercles/services/cercles.service';
import { EventsService } from '../../../events/services/events.service';
import { User } from 'src/app/users/models/user';
import { Cercle } from 'src/app/cercles/models/cercle';
import { Event } from 'src/app/events/models/event';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {


  constructor(
    private _userstService: UsersService,
    private _cerclesService: CerclesService,
    private _eventsService: EventsService
  ) { }

  users!: User[];
  cercles!: Cercle[];
  events!: Event[];

  ngOnInit(): void {
    this.loadUsers();
    this.loadCercles();
    this.loadEvents();
  }

  loadUsers() {
    this._userstService.getUsersAll().subscribe(data => {
      this.users = data;
      console.log(this.users)
    });
  }

  loadCercles() {
    this._cerclesService.getCerclessAll().subscribe(data => {
      this.cercles = data;
    });
  }

  loadEvents() {
    this._eventsService.getEventsAll().subscribe(data => {
      this.events = data;
    });
  }
}
