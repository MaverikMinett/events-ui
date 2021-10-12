import { Component, Input } from "@angular/core";
import { Ticket } from "../../interfaces/event.interface";


@Component({
    templateUrl: './events-tickets.component.html',
    selector: 'events-tickets',
})
export class EventsTicketsComponent {


    @Input() tickets: Ticket[]|undefined = []


}