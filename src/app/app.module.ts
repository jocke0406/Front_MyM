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
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AuthModule } from './auth/auth.module';
import { AuthRoutingModule } from './auth/auth.routing.modules';
import { ColAdminComponent } from './shared/components/col-admin/col-admin.component';
import { AdminModule } from './admin/admin.module';
import { AdminRoutingModule } from './admin/admin.routing.module';
import { MessageService } from 'primeng/api';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastModule } from 'primeng/toast';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent, ColAdminComponent
  ],
  imports: [
    BrowserModule, ToastModule,
    AppRoutingModule, HttpClientModule, LocationsModule, LocationsRoutingModule, AuthModule, AuthRoutingModule,
    EventsRoutingModule, CerclesModule, CerclesRoutingModule, EventsModule, UsersModule, UsersRoutingModule, AdminModule, AdminRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['exemple-domaine-api.com'],
        disallowedRoutes: ['exemple-domaine-api.com/api/auth']
      }
    }),
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
