import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
 

import { environment } from 'src/environments/environment';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AirlineInMemDataService } from './services/airline-in-mem-data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AirlineListComponent } from './airline-list/airline-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    AirlineListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(AirlineInMemDataService),
    RouterModule.forRoot([
      { path: '', redirectTo: '/airlines', pathMatch: 'full' },
      { path: 'viewairlines', component: AirlineListComponent },
      //{ path: 'treasures', component: TreasuresComponent },
      //{ path: 'treasure-detail/:id', component: TreasureDetailComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
