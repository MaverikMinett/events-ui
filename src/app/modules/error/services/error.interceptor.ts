import { Injectable} from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';


@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {

	constructor( private service: ErrorService ) { }

	intercept( request: HttpRequest<any>, next: HttpHandler ) {

		return next.handle(request).pipe(
			catchError( error => {

				this.service.handleError( error )
				
				return throwError(error);
			})
		);
	}

}
