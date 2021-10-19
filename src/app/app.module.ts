import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from 'src/environments/environment';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AirlineInMemDataService } from './services/airline-in-mem-data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AirlineListComponent } from './airline-list/airline-list.component';
import { ListFilterPipe } from './filters/listFilterPipe';
import { CreateAirlineComponent } from './create-airline/create-airline.component';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    AirlineListComponent,
    ListFilterPipe,
    CreateAirlineComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientInMemoryWebApiModule.forRoot(AirlineInMemDataService),
    RouterModule.forRoot([
      { path: '', redirectTo: '/airlines', pathMatch: 'full' },
      { path: 'viewairlines', component: AirlineListComponent },
      { path: 'createairline', component: CreateAirlineComponent },
      //{ path: 'treasure-detail/:id', component: TreasureDetailComponent },
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
