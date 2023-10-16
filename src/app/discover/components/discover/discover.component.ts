import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../users/services/users.service';
import { CerclesService } from '../../../cercles/services/cercles.service';
import { EventsService } from '../../../events/services/events.service';
import { User } from 'src/app/users/models/user';
import { Cercle } from 'src/app/cercles/models/cercle';
import { Event } from 'src/app/events/models/event';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {

  searchForm!: FormGroup;
  users!: User[];
  cercles!: Cercle[];
  events!: Event[];


  constructor(
    private _fb: FormBuilder,
    private _userstService: UsersService,
    private _cerclesService: CerclesService,
    private _eventsService: EventsService
  ) { }


  ngOnInit(): void {
    this.loadUsers();
    this.loadCercles();
    this.loadEvents();
    this.searchForm = this._fb.group({
      searchQuery: ['']
    });
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
  performUserSearch() {
    const query = this.searchForm.value.searchQuery.toLowerCase();
    const filteredUsers = this.users.filter(user =>
      user.pseudo.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
    console.log('Utilisateurs trouvés:', filteredUsers);
  }
}
