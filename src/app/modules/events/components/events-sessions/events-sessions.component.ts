import { Component, Input } from "@angular/core";
import { Session } from "../../interfaces/event.interface";


@Component({
    selector: 'events-sessions',
    templateUrl: './events-sessions.component.html'
})
export class EventsSessionsComponent {
    @Input() sessions: Session[]|undefined = []

}