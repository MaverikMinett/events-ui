
import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog'

import { ErrorDialog } from '../components/error.dialog'
import { Class } from 'src/app/lib/types';


@Injectable({
	providedIn: 'root'
})
export class ErrorService {

	dialog: MatDialog       /* dialog service */

    dialogClass: Class = ErrorDialog

    constructor( injector: Injector ) {
		this.dialog = injector.get( MatDialog )
	}

    /**
     * Handle an HttpError by displaying a dialog with an error message
     * @param response 
     */
	handleError( response:HttpErrorResponse ) {

		let message
        
        if ( response.status == 0 ) {
            message = "Unknown error."
        }
        else if ( response.error?.message ) {
            message = response.error.message
        }
        else {
            message = `${response.status} ${response.statusText}`
        }

		const ref = this.displayError( { message:message } )

	}

    public displayError( params:{ title?:string, message:string } ) {
        this.dialog.open( this.dialogClass, {
            panelClass: ['reactive-dialog', 'error-dialog'],
            autoFocus: true,
            disableClose: true,
            data: params
        })
    }
}