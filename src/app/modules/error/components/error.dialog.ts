import { Component, HostListener, Injector } from '@angular/core'

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
	'templateUrl': './error.dialog.html',
})
export class ErrorDialog {
	title: string
	message: string

	dialogRef: MatDialogRef<ErrorDialog>

	get paragraphs() {
		return this.message ? this.message.split(/\n+/) : [ ]
	}

	constructor( injector:Injector ) {
		this.dialogRef = injector.get(MatDialogRef)

		const data   = injector.get(MAT_DIALOG_DATA)
		this.title   = data.title 
		this.message = data.message
	}

	close( return_value=null ) {
		this.dialogRef.close( return_value )
	}

	@HostListener('window:keyup.esc') 
	onKeyUp() { this.close() }
	
}