import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LocationsModule } from './locations/locations.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LocationsRoutingModule } from "./locations/locations-routing.module";
import { CerclesModule } from './cercles/cercles.module';
import { CerclesRoutingModule } from './cercles/cerclers.routing.module';
import { EventsModule } from './events/events.module';
import { EventsRoutingModule } from './events/events.routing.module';
import { UsersModule } from './users/users.module';
import { UsersRoutingModule } from './users/users-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, LocationsModule, LocationsRoutingModule,
    EventsRoutingModule, CerclesModule, CerclesRoutingModule, EventsModule, UsersModule, UsersRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
