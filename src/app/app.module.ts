import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AdminModule } from './admin/admin.module';
import { AdminRoutingModule } from './admin/admin.routing.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthRoutingModule } from './auth/auth.routing.modules';
import { CerclesRoutingModule } from './cercles/cerclers.routing.module';
import { CerclesModule } from './cercles/cercles.module';
import { DiscoverRoutingModule } from './discover/discover-routing.module';
import { DiscoverModule } from './discover/discover.module';
import { EventsModule } from './events/events.module';
import { EventsRoutingModule } from './events/events.routing.module';
import { LocationsRoutingModule } from './locations/locations-routing.module';
import { LocationsModule } from './locations/locations.module';
import { ColAdminComponent } from './shared/components/col-admin/col-admin.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { UsersRoutingModule } from './users/users-routing.module';
import { UsersModule } from './users/users.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ColAdminComponent,
  ],
  imports: [
    BrowserModule,
    ToastModule,
    DiscoverModule,
    AppRoutingModule,
    HttpClientModule,
    DiscoverRoutingModule,
    LocationsModule,
    LocationsRoutingModule,
    AuthModule,
    AuthRoutingModule,
    EventsRoutingModule,
    CerclesModule,
    CerclesRoutingModule,
    EventsModule,
    UsersModule,
    UsersRoutingModule,
    AdminModule,
    AdminRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['exemple-domaine-api.com'],
        disallowedRoutes: ['exemple-domaine-api.com/api/auth'],
      },
    }),
  ],
  providers: [MessageService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
