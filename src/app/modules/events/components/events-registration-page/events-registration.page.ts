import { Component } from "@angular/core";
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar'

import { FormState } from "../../../../lib/types";
import { Event, EventDetail } from "../../interfaces/event.interface";
import { EventService } from "../../services/event.service";




/**
 * Store for various price totals for an attendee
 */
interface AttendeeSummary {
  ticket_price: number
  total_price: number
  total_sessions_price: number
}


/**
 * Store information about an attendee that was removed from the from so that
 * the removal can be undone via user action
 */
class RemoveAttendeeUndo {
  constructor( 
    public index:number, 
    public controls: AbstractControl, 
    public summary: AttendeeSummary ) {

    }
}



@Component({
    templateUrl: './events-registration.page.html',
})
export class EventsRegistrationPage {

    event: EventDetail
    
    formControls: FormArray = new FormArray([])

    sumTotalPrice: number = 0.00

    attendees: AttendeeSummary[] = []

    formState: FormState = 'ready'


    constructor( public service: EventService, private route: ActivatedRoute, private snackbar: MatSnackBar ) {
  
    }

    addAttendee() {
      this.attendees.push( { ticket_price: 0, total_price: 0, total_sessions_price: 0 } )
      this.formControls.push( this._buildFormControlsForAttendee() )
    }

    private _buildFormControlsForAttendee( ) {
      return new FormGroup({
        first_name: new FormControl('', [Validators.required, Validators.maxLength(32) ] ),
        last_name: new FormControl('', [Validators.required, Validators.maxLength(32)]  ),
        email: new FormControl('', [Validators.required,Validators.email,Validators.maxLength(64)] ),
        phone: new FormControl('', [Validators.maxLength(32)] ),
        company: new FormControl('', [Validators.maxLength(128)]),
        ticket: new FormControl('', Validators.required ),
        sessions: new FormArray(
          this.event.sessions ? this.event.sessions.map( () => new FormControl("") ) : []
        )
      })
    }

    getFormControl( index:number, field:string ) {
      return <FormControl>this.formControls.at(index).get(field)
    }

  
    ngOnInit() {

      /* load event using route parameter */
      this.route.params.subscribe( params => {
        const id = params.id
        this.service.retrieve(id).subscribe( item => {
          this.event = item 
          this.addAttendee()
        } )
      })

      /* subscribe to form value changes */
      this.formControls.valueChanges.subscribe( (values) => {
        this.calculateSums(values)
      })

    }

    toggleSessionCheckbox( attendeeIndex:number, sessionIndex:number ) {
      const controls = <FormArray>this.formControls.at(attendeeIndex ).get('sessions')
      const control = controls.at(sessionIndex)
      if ( this.event?.sessions ) {
        if ( control.value === undefined || control.value === null || control.value === "" ) {
          control.setValue( this.event.sessions[sessionIndex] )
        }
        else {
          control.setValue( "" )
        }
        
      }
    }

    /**
     * Remove an attendee, will display a snackbar which provides an 'undo' action
     * to restore the removed attendee
     * @param index 
     */
    removeAttendee( index:number ) {

      const attendeeSum = this.attendees[index]
      const formControls = this.formControls.at(index)
      this.formControls.removeAt(index)
      this.attendees.splice(index,1)


      const undo = new RemoveAttendeeUndo(index, formControls, attendeeSum )

      this.snackbar.open("Attendee removed", "Undo", { duration: 3000 } ).onAction().subscribe( () => {
        this.restoreAttendee( undo )
      })
    }


    /**
     * Restore an attendee which was removed
     * @param undo 
     */
    private restoreAttendee( undo: RemoveAttendeeUndo ) {
      this.attendees.splice(undo.index,0,undo.summary)   
      this.formControls.insert(undo.index, undo.controls)
    }



    calculateSums( values:any[] ) {

      let page_total_price = 0


      for (let i = 0; i < this.formControls.length; i++ ) {


        const attendee = values[i]
        const sum = this.attendees[i]

        
        sum.ticket_price = attendee.ticket?.price ?? 0
        sum.total_sessions_price = attendee.sessions
          .filter( (s:any) => s )
          .reduce( (sum:number, session:any) => sum += session.price, 0 )

        sum.total_price = sum.ticket_price + sum.total_sessions_price;


        page_total_price += sum.total_price
      }

      this.sumTotalPrice = page_total_price

    }


    submit() {

      this.formState = 'pending'

      const datas = this.formControls.value
      const attendees:any[] = []
      for ( let attendeeData of datas ) {
        const attendee = Object.assign({}, attendeeData)
        attendee.sessions = attendee.sessions.filter( (s:any) => s ).map( (s:any) => s.id )
        attendee.ticket = attendee.ticket.id
        attendees.push( attendee )
      }


      this.service.register( this.event.id, attendees ).subscribe( () => {
        this.formState = 'success'
      },
      (e) => {
        this.formState = 'error'
      })

    }


}