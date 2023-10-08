import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Event } from '../../models/event';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Subject, combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-events-detail',
  templateUrl: './events-detail.component.html',
  styleUrls: ['./events-detail.component.css']
})
export class EventsDetailComponent implements OnInit, OnDestroy {

  event: Event | null = null;
  currentUserId?: string;

  private _unsubscribeAll = new Subject<void>();

  showParticipants: boolean = false;

  constructor(private _route: ActivatedRoute, private _eventsService: EventsService,
    private _auth: AuthService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    combineLatest([
      this._auth.userConnectedId$,
      this._route.params.pipe(switchMap(({ id }) => this._eventsService.getEventFull(id)))
    ]).pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (results: (string | Event | null)[]) => {

          if (results.length !== 2) {
            console.error("Mauvais format de données reçu !");
            return;
          }

          this.currentUserId = results[0] as string;
          this.event = results[1] as Event;


          if (!this.currentUserId || !this.event) {
            console.error("Des données sont manquantes !");
            return;
          }
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  isCurrentUserParticipating(): boolean {
    if (!this.event || !this.event.participants) {
      return false
    }
    return this.event!.participants!.some(participant => participant._id === this.currentUserId);
  }

  eventAddParticipant() {
    this._eventsService.eventAddParticipant(this.event!._id, this.currentUserId!)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response: Event) => {
          this._messageService.add({ severity: 'success', summary: 'Succès', detail: 'Participant ajouté avec succès!', life: 2000 });
          this.loadEventDetails();
        },
        error: (error) => {
          console.log('Erreur lors de l\'ajout du participant', error);
          this._messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible d\'ajouter le participant', life: 2000 });
        }

      })

  }

  toggleParticipants(): void {
    this.showParticipants = !this.showParticipants;
  };


  eventRemoveParticipant() {
    this._eventsService.eventRemoveParticipant(this.event!._id, this.currentUserId!)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response: Event) => {
          this._messageService.add({ severity: 'success', summary: 'Succès', detail: 'Participant annulée avec succès!', life: 2000 });
          this.loadEventDetails();
        },
        error: (error) => {
          console.log('Erreur lors de la suppression du participant', error);
          this._messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de supprimer le participant', life: 2000 });
        }

      })

  }

  private loadEventDetails() {
    this._route.params.pipe(
      switchMap(({ id }) => this._eventsService.getEventFull(id)),
      takeUntil(this._unsubscribeAll)
    ).subscribe({
      next: (data) => {
        this.event = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
