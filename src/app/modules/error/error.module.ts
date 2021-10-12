
/* Angular */
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


import { ErrorDialog } from './components/error.dialog';
import { ErrorInterceptor } from './services/error.interceptor';


@NgModule({
    imports: [ 
        CommonModule,
        
        MatButtonModule, 
        MatDialogModule, 
    ],
    declarations: [ ErrorDialog ],
    providers: [ 
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
     ],
})
export class ErrorModule { }