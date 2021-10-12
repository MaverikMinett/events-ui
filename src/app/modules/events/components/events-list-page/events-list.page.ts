import { Component } from "@angular/core";
import { Event } from "../../interfaces/event.interface";
import { EventService } from "../../services/event.service";

@Component({
    templateUrl: './events-list.page.html',
})
export class EventsListPage {

    events: Event[]

    constructor( public service: EventService ) {
  
    }
  
    ngOnInit() {
      this.service.list().subscribe( events => this.events = events )
    }
  
}