import { Component } from '@angular/core';
import { Event } from './modules/events/interfaces/event.interface';
import { EventService } from './modules/events/services/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blackthorn-ui';


}
