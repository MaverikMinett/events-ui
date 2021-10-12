import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { EventService } from "./services/event.service";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";

import { EventsRoutingModule } from "./events-routing.module";
import { EventsDetailPage } from "./components/events-detail-page/events-detail.page";
import { EventsListPage } from "./components/events-list-page/events-list.page";
import { StripHtmlPipe } from "./directives/strip-html.pipe";
import { EventsSessionsComponent } from "./components/events-sessions/events-sessions.component";
import { EventsTicketsComponent } from "./components/events-tickets/events-tickets.component";
import { EventsRegistrationPage } from "./components/events-registration-page/events-registration.page";



@NgModule({
    declarations: [
        EventsDetailPage,
        EventsListPage,
        EventsRegistrationPage,
        EventsSessionsComponent,
        EventsTicketsComponent,
        StripHtmlPipe,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,


        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatListModule,
        MatIconModule,
        MatTooltipModule,

        MatInputModule,
        MatSelectModule,
        MatSnackBarModule,

        EventsRoutingModule,
    ],
    providers: [ EventService ],
})
export class EventsModule {
    
}