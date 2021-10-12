import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'

import { environment } from "src/environments/environment";
import { Attendee, Event, EventDetail} from "../interfaces/event.interface";

@Injectable({providedIn: 'root'})
export class EventService {
    
    apiRoot: string = environment.apiRoot
    apiPath: string = 'events'

    constructor( private http: HttpClient ) {

    }

    list() {
        return this.http
            .get<Event[]>(`${this.apiRoot}/${this.apiPath}`)
    }

    retrieve( id:number ) {
        return this.http
            .get<EventDetail>(`${this.apiRoot}/${this.apiPath}/${id}`)
    }

    register( id:number, attendees: Attendee[] ) {
        return this.http
            .post<{id: number}>(`${this.apiRoot}/${this.apiPath}/${id}/register`, { attendees } )
    }

}