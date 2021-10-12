import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EventDetail } from "../../interfaces/event.interface";
import { EventService } from "../../services/event.service";



@Component({
    templateUrl: './events-detail.page.html',
})
export class EventsDetailPage {

    event: EventDetail

    constructor( public service: EventService, private route: ActivatedRoute ) {
  
    }
  
    ngOnInit() {
      this.route.params.subscribe( params => {
        const id = params.id
        this.service.retrieve(id).subscribe( item => this.event = item )
      })
    }


    downloadCalendarFile() {
      alert("This would download an ICS calendar file.") 
    }

}